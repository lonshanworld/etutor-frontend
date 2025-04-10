import { useEffect, useState, useRef, TouchEvent, useId } from "react";
import { BiSolidPhone } from "react-icons/bi";
import { MdEmail, MdOutlineMessage } from "react-icons/md";
import ProfilePic from "../ProfilePic";
import { capitalizeFirstLetter, formatName } from "@/utils/formatData";
import { useUserStore } from "@/stores/useUserStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { AppRouter } from "@/router";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  userId: number;
  onClose: () => void;
}

const ProfileBoxPopup = ({ className, userId, onClose }: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("-");
  const [email, setEmail] = useState<string>("-");
  const [phone, setPhone] = useState<string>("-");
  const [role, setRole] = useState<string>("-");
  const [profileUrl, setProfileUrl] = useState<string | null>("");
  const [status, setStatus] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("-");
  const [gender, setGender] = useState<string>("-");
  const [address, setAddress] = useState<string>("-");
  const [nationality, setNationality] = useState<string>("-");
  const [passport, setPassport] = useState<string>("-");
  const [emergencyName, setEmergencyName] = useState<string>("-");
  const [emergencyPhone, setEmrgencyPhone] = useState<string>("-");
  const [major, setMajor] = useState<string>("-");
  const [enrollDate, setEnrollDate] = useState<string>("-");
  const [qualification, setQualification] = useState<string>("-");
  const [experience, setExperience] = useState<string>("-");
  const [subject, setSubject] = useState<string>("-");

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isViewerTutor, setIsViewerTutor] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();

  // Store
  const { getUserId, user } = useUserStore();
  const { fetchProfile } = useProfileStore();

  // Chat
  const createConversation = useMutation(api.chatRoom.createConversation);
  const [user1, setUser1] = useState<userChat | null>(null);
  const [user2, setUser2] = useState<userChat | null>(null);

  // For drag functionality
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const touchStartedOnHeader = useRef<boolean>(false);
  const isAtTopEdge = useRef<boolean>(false);

  type userChat = {
    userId: number;
    firstName: string;
    middleName?: string;
    lastName?: string;
    email: string;
    role: string;
    profileImagePath?: string;
    gender?: string;
  };

  // set user1 on load
  useEffect(() => {
    if (user) {
      setUser1({
        userId: user.id,
        firstName: user.firstName!,
        middleName: user.middleName ?? undefined,
        lastName: user.lastName ?? undefined,
        email: user.email,
        role: user.role!,
        profileImagePath: user.profileImagePath ?? undefined,
        gender: user.gender,
      });
    }
  }, [user]);

  useEffect(() => {
    loadProfile();

    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Set visible after a small delay to trigger animation
    setTimeout(() => {
      setShowOverlay(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    }, 10);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [user, userId]);

  // Monitor scroll position to detect when at top
  useEffect(() => {
    const contentElement = contentRef.current;

    const handleScroll = () => {
      if (contentElement) {
        isAtTopEdge.current = contentElement.scrollTop === 0;
      }
    };

    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      // Initialize the value
      isAtTopEdge.current = contentElement.scrollTop === 0;
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isVisible, isMobile]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      if (userId && user) {
        const profile = await fetchProfile(userId, user);

        setIsOwnProfile(getUserId() === userId);

        const fullName = formatName(
          profile.firstName,
          profile.middleName,
          profile.lastName
        );
        setUsername(fullName);
        setEmail(profile.email);
        setPhone(profile.phone || "-");
        setRole(profile.role);
        setProfileUrl(profile.profileUrl);
        setStatus(profile.status);
        setBirthday(profile.dob || "-");
        setGender(profile.gender || "-");
        setNationality(profile.nationality || "-");

        setAddress(profile.address || "-");
        setPassport(profile.passport || "-");

        // Student
        setEmergencyName(profile.emergencyName || "-");
        setEmrgencyPhone(profile.emergencyPhone || "-");
        setMajor(profile.major || "-");
        setEnrollDate(profile.enrollDate || "-");

        // Tutor
        setQualification(profile.qualification || "-");
        setExperience(profile.experience || "-");
        setSubject(profile.subject || "-");

        setUser2({
          userId: profile.userId,
          firstName: profile.firstName,
          middleName: profile.middleName ?? undefined,
          lastName: profile.lastName ?? undefined,
          email: profile.email,
          role: profile.role,
          profileImagePath: profile.profileUrl ?? undefined,
          gender: profile.gender,
        });
      }
    } catch (err) {
      setTimeout(() => onClose(), 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (user1 && user2) {
      const chatId = await createConversation({
        user1,
        user2,
      });
      if (user1.role === "student") {
        router.push(`${AppRouter.studentChatBox}?id=${chatId}`);
      } else if (user1.role === "tutor") {
        router.push(`${AppRouter.tutorChatBox}?id=${chatId}`);
      }
    }
  };

  // Below are all animation effects
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowOverlay(false);
      setTimeout(() => {
        onClose();
      }, 100);
    }, 200); // Match this timing with the CSS transition duration
  };

  const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-muted rounded ${className}`} />
  );

  // Handle touch start for drag
  const handleTouchStart = (e: TouchEvent) => {
    if (!isMobile) return;

    // Check if the touch started on the header or drag indicator
    const target = e.target as Node;
    touchStartedOnHeader.current = headerRef.current?.contains(target) || false;

    if (!touchStartedOnHeader.current && !isAtTopEdge.current) return;

    isDragging.current = true;
    dragStartY.current = e.touches[0].clientY;

    // Disable transitions during drag
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  };

  // Handle touch move for drag
  const handleTouchMove = (e: TouchEvent) => {
    if (
      !isDragging.current ||
      !isMobile ||
      (!touchStartedOnHeader.current && !isAtTopEdge.current)
    )
      return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY.current;

    // Only allow dragging downward (positive diff)
    if (diff < 0) return;

    currentTranslate.current = diff;

    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }

    // Prevent default scrolling behavior when we're in drag mode
    // e.preventDefault();
  };

  // Handle touch end for drag
  const handleTouchEnd = () => {
    if (
      !isDragging.current ||
      !isMobile ||
      (!touchStartedOnHeader.current && !isAtTopEdge.current)
    )
      return;
    isDragging.current = false;
    touchStartedOnHeader.current = false;

    if (sheetRef.current) {
      // Add transition back
      sheetRef.current.style.transition = "transform 0.3s ease-out";

      // If dragged down more than 100px, close the popup
      if (currentTranslate.current > 100) {
        sheetRef.current.style.transform = "translateY(100%)";
        handleClose();
      } else {
        // Otherwise, snap back to original position
        sheetRef.current.style.transform = "translateY(0)";
      }
    }

    currentTranslate.current = 0;
  };

  // Main content of the profile box that's shared between mobile and desktop
  const profileContent = (
    <>
      <div className='h-[80px] bg-theme w-full'></div>
      <div>
        {/* profile photo */}
        <div className='absolute top-9 left-5'>
          <div className='rounded-full bg-background p-1.5'>
            {isLoading ?
              <Skeleton className='rounded-full w-[80px] h-[80px]' />
            : <ProfilePic
                profileUrl={profileUrl}
                size={80}
              />
            }
          </div>
        </div>

        {!isOwnProfile && (
          <div className='absolute top-[60px] right-4'>
            <button
              onClick={handleChat}
              className='px-4 py-2 bg-secondaryBackground rounded-lg flex items-end gap-1.5 text-primaryText'
            >
              <MdOutlineMessage size={20} />
              Message
            </button>
          </div>
        )}

        {isLoading ?
          <div className='mt-8 px-5 py-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Skeleton className='w-[120px] h-[24px]' />
                <Skeleton className='w-[60px] h-[20px]' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-2 w-2 rounded-full' />
                <Skeleton className='w-[60px] h-[16px]' />
              </div>
            </div>
            <div className='pt-1 space-y-2'>
              <Skeleton className='w-[200px] h-[18px]' />
              <Skeleton className='w-[140px] h-[18px]' />
            </div>
          </div>
        : <div>
            <div className='mt-8 px-5 py-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <p className='font-semibold text-xl text-primaryText'>
                    {username}
                  </p>
                  <div className='text-sm px-1.5 bg-theme rounded-sm text-white'>
                    {capitalizeFirstLetter(role)}
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  {status === "activated" ?
                    <div className='rounded-full h-2 w-2 bg-green-600'></div>
                  : <div className='rounded-full h-2 w-2 bg-red-600'></div>}
                  <span className='text-sm'>
                    {capitalizeFirstLetter(status)}
                  </span>
                </div>
              </div>
              <div className='pt-1 space-y-1'>
                <div className='flex items-end gap-1.5'>
                  <MdEmail className='text-theme' />
                  <p className='text-sm underline text-secondaryText'>
                    {email}
                  </p>
                </div>
                <div className='flex items-end gap-1.5'>
                  <BiSolidPhone
                    size={17}
                    className='text-theme'
                  />
                  <p className='text-sm text-secondaryText'>{phone}</p>
                </div>
              </div>
            </div>

            {isMobile && (isOwnProfile || user?.role !== "student") && (
              <>
                <div className='px-5 pb-6'>
                  <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
                    <div className='pb-4'>
                      <p className='text-sm font-semibold'>Date of Birthday</p>
                      <p className='text-sm'>{birthday}</p>
                    </div>
                    <div className='pb-4'>
                      <p className='text-sm font-semibold'>Gender</p>
                      <p className='text-sm'>{gender}</p>
                    </div>
                    <div className='pb-4'>
                      <p className='text-sm font-semibold'>Nationality</p>
                      <p className='text-sm'>{nationality}</p>
                    </div>
                    <div className='pb-4'>
                      <p className='text-sm font-semibold'>Passport</p>
                      <p className='text-sm'>{passport}</p>
                    </div>
                    <div className=''>
                      <p className='text-sm font-semibold'>Address</p>
                      <p className='text-sm'>{address}</p>
                    </div>
                  </div>
                </div>

                {role === "student" && (
                  <>
                    <div className='px-5 pb-6'>
                      <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
                        <div className='pb-4'>
                          <p className='text-sm font-semibold'>
                            Emergency Name
                          </p>
                          <p className='text-sm'>{emergencyName}</p>
                        </div>
                        <div>
                          <p className='text-sm font-semibold'>
                            Emergency Phone
                          </p>
                          <p className='text-sm'>{emergencyPhone}</p>
                        </div>
                      </div>
                    </div>

                    <div className='px-5 pb-6'>
                      <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
                        <div className='pb-4'>
                          <p className='text-sm font-semibold'>Major</p>
                          <p className='text-sm'>{major}</p>
                        </div>
                        <div>
                          <p className='text-sm font-semibold'>
                            Enrollment Date
                          </p>
                          <p className='text-sm'>{enrollDate}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {role === "tutor" && (
                  <>
                    <div className='px-5 pb-6'>
                      <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
                        <div className='pb-4'>
                          <p className='text-sm font-semibold'>Qualification</p>
                          <p className='text-sm'>{qualification}</p>
                        </div>
                        <div className='pb-4'>
                          <p className='text-sm font-semibold'>Experience</p>
                          <p className='text-sm'>{experience}</p>
                        </div>
                        <div className=''>
                          <p className='text-sm font-semibold'>Subject</p>
                          <p className='text-sm'>{subject}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        }
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile overlay with conditional rendering to prevent flash */}
        {showOverlay && (
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={handleClose}
          ></div>
        )}

        {/* Mobile bottom sheet with drag functionality */}
        <div
          ref={sheetRef}
          className={`fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-xl transition-transform duration-300 ease-out ${
            isVisible ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "80vh" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Drag handle header - this is the primary draggable area */}
          <div
            ref={headerRef}
            className='sticky top-0 z-10 pt-3 pb-1 flex justify-center bg-theme w-full'
          >
            <div className='w-12 h-1 bg-gray-300 rounded-full'></div>
          </div>

          {/* Scrollable content container */}
          <div
            ref={contentRef}
            className='max-h-[calc(80vh-30px)] overflow-y-auto overscroll-contain'
          >
            {/* Profile content */}
            <div className='relative'>{profileContent}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`absolute ${className}`}>
      {/* Desktop overlay with conditional rendering */}
      {showOverlay && (
        <div
          onClick={handleClose}
          className={`fixed top-0 left-0 w-full h-full z-40 select-none transition-opacity duration-300 ${
            isVisible ? "bg-black bg-opacity-30" : "bg-opacity-0"
          }`}
        ></div>
      )}

      {/* Desktop popup box with subtle slide animation */}
      <div
        className={`relative bg-background sm:rounded-lg min-w-[300px] sm:w-[350px] min-h-[240px] rounded-lg overflow-clip shadow-xl z-50 
          transition-all duration-300 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
      >
        {profileContent}
      </div>
    </div>
  );
};

export default ProfileBoxPopup;
