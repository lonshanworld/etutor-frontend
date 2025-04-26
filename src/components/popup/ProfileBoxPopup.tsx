"use client";

import { AppRouter } from "@/router";
import { ProfileData, useProfileStore } from "@/stores/useProfileStore";
import { useUserStore } from "@/stores/useUserStore";
import { capitalizeFirstLetter, formatName } from "@/utils/formatData";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { TouchEvent, useEffect, useRef, useState } from "react";
import { BiSolidPhone } from "react-icons/bi";
import { IoOpenOutline } from "react-icons/io5";
import { MdEmail, MdOutlineMessage } from "react-icons/md";
import { api } from "../../../convex/_generated/api";
import ProfilePic from "../ProfilePic";
import ProfileDetailView from "./ProfileDetailView";

interface Props {
  className?: string;
  userId: number;
  onClose: () => void;
}

type UserChatInfo = {
  userId: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  role: string;
  profileImagePath?: string;
  gender?: string;
};

interface DragState {
  isDragging: boolean;
  dragStartY: number;
  currentTranslate: number;
  touchStartedOnHeader: boolean;
  isAtTopEdge: boolean;
}

const ProfileBoxPopup = ({ className, userId, onClose }: Props) => {
  const [profileState, setProfileState] = useState<ProfileData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showDetailProfile, setShowDetailProfile] = useState(false); // State to control detailed profile view
  const router = useRouter();
  const { getUserId, user, isReadOnly } = useUserStore();
  const { fetchProfile } = useProfileStore();
  const createConversation = useMutation(api.chatRoom.createConversation);

  // Animation
  const [uiState, setUiState] = useState({
    isVisible: false,
    showOverlay: false,
    isMobile: false,
  });
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState>({
    isDragging: false,
    dragStartY: 0,
    currentTranslate: 0,
    touchStartedOnHeader: false,
    isAtTopEdge: false,
  });

  useEffect(() => {
    loadProfile();

    // Check on mobile
    const checkMobile = () => {
      setUiState((prev) => ({ ...prev, isMobile: window.innerWidth < 1024 }));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Set visible after a small delay to trigger animation
    setTimeout(() => {
      setUiState((prev) => ({ ...prev, showOverlay: true }));
      setTimeout(() => {
        setUiState((prev) => ({ ...prev, isVisible: true }));
      }, 50);
    }, 10);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [user, userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      if (userId && user) {
        const profile = await fetchProfile(userId, user);
        setProfileState(profile);
        setIsOwnProfile(getUserId() === userId);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setTimeout(() => onClose(), 1000); // auto close popup if error
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!user || !profileState) return;

    try {
      const chatId = await createConversation({
        user1Id: user.id,
        user2Id: profileState.userId,
      });

      if (user.role === "student") {
        router.push(`${AppRouter.studentChatBox}?id=${chatId}`);
      } else if (user.role === "tutor") {
        router.push(`${AppRouter.tutorChatBox}?id=${chatId}`);
      }
    } catch (error) {
      console.error("error in chat", error);
    }
  };

  // Handler for view detail button
  const handleViewDetail = () => {
    setShowDetailProfile(true);
  };

  const handleClose = () => {
    setUiState((prev) => ({ ...prev, isVisible: false }));
    setTimeout(() => {
      setUiState((prev) => ({ ...prev, showOverlay: false }));
      setTimeout(() => {
        onClose();
      }, 100);
    }, 200);
  };

  // Close detailed profile view
  const handleCloseDetailView = () => {
    setShowDetailProfile(false);
  };

  // Below are all animmation related
  useEffect(() => {
    const contentElement = contentRef.current;

    const handleScroll = () => {
      if (contentElement) {
        dragState.current.isAtTopEdge = contentElement.scrollTop === 0;
      }
    };

    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      // Initialize the value
      dragState.current.isAtTopEdge = contentElement.scrollTop === 0;
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [uiState.isVisible, uiState.isMobile]);

  const handleTouchStart = (e: TouchEvent) => {
    if (!uiState.isMobile) return;

    const target = e.target as Node;
    dragState.current.touchStartedOnHeader =
      headerRef.current?.contains(target) || false;

    if (
      !dragState.current.touchStartedOnHeader &&
      !dragState.current.isAtTopEdge
    )
      return;

    dragState.current.isDragging = true;
    dragState.current.dragStartY = e.touches[0].clientY;

    // Disable transitions during drag
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const { isDragging, touchStartedOnHeader, isAtTopEdge } = dragState.current;

    if (
      !isDragging ||
      !uiState.isMobile ||
      (!touchStartedOnHeader && !isAtTopEdge)
    )
      return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragState.current.dragStartY;

    // Only allow dragging downward (positive diff)
    if (diff < 0) return;

    dragState.current.currentTranslate = diff;

    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    const { isDragging, touchStartedOnHeader, isAtTopEdge, currentTranslate } =
      dragState.current;

    if (
      !isDragging ||
      !uiState.isMobile ||
      (!touchStartedOnHeader && !isAtTopEdge)
    )
      return;

    dragState.current.isDragging = false;
    dragState.current.touchStartedOnHeader = false;

    if (sheetRef.current) {
      // Add transition back
      sheetRef.current.style.transition = "transform 0.3s ease-out";

      // If dragged down more than 100px, close the popup
      if (currentTranslate > 100) {
        sheetRef.current.style.transform = "translateY(100%)";
        handleClose();
      } else {
        // Otherwise, snap back to original position
        sheetRef.current.style.transform = "translateY(0)";
      }
    }

    dragState.current.currentTranslate = 0;
  };

  // Components
  const Skeleton = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse bg-muted rounded ${className}`} />
  );

  const InfoItem = ({
    label,
    value,
    isLast = false,
  }: {
    label: string;
    value: string;
    isLast?: boolean;
  }) => (
    <div className={!isLast ? "pb-4" : ""}>
      <p className='text-sm font-semibold'>{label}</p>
      <p className='text-sm'>{value}</p>
    </div>
  );

  const PersonalInfoSection = () => {
    if (!profileState) return null;

    return (
      <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
        <InfoItem
          label='Date of Birthday'
          value={profileState.dob || "-"}
        />
        <InfoItem
          label='Gender'
          value={profileState.gender || "-"}
        />
        <InfoItem
          label='Nationality'
          value={profileState.nationality || "-"}
          isLast={user?.role !== "staff" && !isOwnProfile}
        />
        {(user?.role === "staff" || isOwnProfile) && (
          <>
            <InfoItem
              label='Passport'
              value={profileState.passport || "-"}
            />
            <InfoItem
              label='Address'
              value={profileState.address || "-"}
              isLast
            />
          </>
        )}
      </div>
    );
  };

  const StudentInfoSection = () => {
    if (!profileState || profileState.role !== "student") return null;

    return (
      <>
        {(isOwnProfile || user?.role === "tutor" || user?.role === "staff") && (
          <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
            <InfoItem
              label='Major'
              value={profileState.major || "-"}
            />
            <InfoItem
              label='Enrollment Date'
              value={profileState.enrollDate || "-"}
              isLast={user?.role !== "staff" || !isOwnProfile}
            />
          </div>
        )}

        {(user?.role === "staff" || isOwnProfile) && (
          <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText mb-6'>
            <InfoItem
              label='Emergency Contact Name'
              value={profileState.emergencyName || "-"}
            />
            <InfoItem
              label='Emergency Contact Phone'
              value={profileState.emergencyPhone || "-"}
              isLast
            />
          </div>
        )}
      </>
    );
  };

  const TutorInfoSection = () => {
    if (!profileState || profileState.role !== "tutor") return null;

    return (
      <div className='bg-secondaryBackground p-3 rounded-xl text-secondaryText'>
        <InfoItem
          label='Qualification'
          value={profileState.qualification || "-"}
        />
        <InfoItem
          label='Experience'
          value={profileState.experience || "-"}
        />
        <InfoItem
          label='Subject'
          value={profileState.subject || "-"}
          isLast
        />
      </div>
    );
  };

  const ProfileHeader = () => {
    if (isLoading) {
      return (
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
      );
    }

    if (!profileState) return null;

    const fullName = formatName(
      profileState.firstName,
      profileState.middleName,
      profileState.lastName
    );

    return (
      <div className='mt-8 px-5 py-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <p className='font-semibold text-xl text-primaryText'>{fullName}</p>
            <div className='text-sm px-1.5 bg-theme rounded-sm text-white'>
              {capitalizeFirstLetter(profileState.role)}
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <div
              className={`rounded-full h-2 w-2 ${profileState.status === "activated" ? "bg-green-600" : "bg-red-600"}`}
            ></div>
            <span className='text-sm'>
              {capitalizeFirstLetter(profileState.status)}
            </span>
          </div>
        </div>
        <div className='pt-1 space-y-1'>
          <div className='flex items-end gap-1.5'>
            <MdEmail className='text-theme' />
            <p className='text-sm underline text-secondaryText'>
              {profileState.email}
            </p>
          </div>
          <div className='flex items-end gap-1.5'>
            <BiSolidPhone
              size={17}
              className='text-theme'
            />
            <p className='text-sm text-secondaryText'>
              {profileState.phone || "-"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Main content of the profile box
  const profileContent = (
    <>
      <div className='h-[80px] bg-theme w-full'>
        {!uiState.isMobile && (
          <div
            onClick={handleViewDetail}
            className='w-full flex justify-end p-2 cursor-pointer'
            aria-label='View detailed profile'
          >
            <IoOpenOutline color='white' />
          </div>
        )}
      </div>
      <div>
        {/* profile photo */}
        <div className='absolute top-9 left-5'>
          <div className='rounded-full bg-background p-1.5'>
            {isLoading ?
              <Skeleton className='rounded-full w-[80px] h-[80px]' />
            : <ProfilePic
                profileUrl={profileState?.profileUrl || ""}
                size={80}
              />
            }
          </div>
        </div>

        {!isOwnProfile && profileState && (
          <div className='absolute top-[60px] right-4'>
            <button
              onClick={handleChat}
              className={`px-4 py-2 bg-secondaryBackground rounded-lg flex  text-primaryText hover:bg-opacity-80 transition-colors ${isReadOnly ? "pointer-events-none" : "cursor-pointer"}`}
              aria-label='Message user'
            >
              <div
                className={`flex items-end gap-1.5 ${isReadOnly && "opacity-50"}`}
              >
                <MdOutlineMessage size={20} />
                <span>Message</span>
              </div>
            </button>
          </div>
        )}

        <ProfileHeader />

        {uiState.isMobile && (
          <div className='px-5 pb-6 space-y-6'>
            <PersonalInfoSection />
            <StudentInfoSection />
            <TutorInfoSection />
          </div>
        )}
      </div>
    </>
  );

  // Render detailed profile view if requested
  if (showDetailProfile && profileState && !uiState.isMobile) {
    return (
      <ProfileDetailView
        profile={profileState}
        onClose={handleCloseDetailView}
        onChat={handleChat}
        isOwnProfile={isOwnProfile}
        isStaff={user?.role === "staff"}
        isTutor={user?.role === "tutor"}
      />
    );
  }

  if (uiState.isMobile) {
    return (
      <>
        {/* Mobile overlay with conditional rendering to prevent flash */}
        {uiState.showOverlay && (
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
              uiState.isVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={handleClose}
            aria-hidden='true'
          ></div>
        )}

        {/* Mobile bottom sheet with drag functionality */}
        <div
          ref={sheetRef}
          className={`fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-xl transition-transform duration-300 ease-out ${
            uiState.isVisible ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "80vh" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role='dialog'
          aria-modal='true'
          aria-label='User Profile'
        >
          {/* Drag handle header - this is the primary draggable area */}
          <div
            ref={headerRef}
            className='sticky top-0 z-10 pt-3 pb-1 flex justify-center bg-theme w-full'
          >
            <div
              className='w-12 h-1 bg-gray-300 rounded-full'
              aria-label='Drag to close'
            ></div>
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
      {uiState.showOverlay && (
        <div
          onClick={handleClose}
          className={`fixed top-0 left-0 w-full h-full z-40 select-none transition-opacity duration-300 ${
            uiState.isVisible ? "bg-black bg-opacity-20" : "bg-opacity-0"
          }`}
          aria-hidden='true'
        ></div>
      )}

      {/* Desktop popup box with subtle slide animation */}
      <div
        className={`relative bg-background sm:rounded-lg min-w-[300px] sm:w-[350px] min-h-[240px] rounded-lg overflow-clip shadow-xl z-50 
          transition-all duration-300 ease-out ${uiState.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        role='dialog'
        aria-modal='true'
        aria-label='User Profile'
      >
        {profileContent}
      </div>
    </div>
  );
};

export default ProfileBoxPopup;
