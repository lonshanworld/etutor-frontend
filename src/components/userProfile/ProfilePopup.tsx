import { useUserStore } from "@/stores/useUserStore";
import { useRef, useState } from "react";
import Profile from "@/assets/images/Profile.png";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { AppRouter } from "@/router";
import { useToast } from "@/stores/useToast";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { sendLogoutEvent } from "@/api/services/events";

const ProfilePopup = ({
  setProfilePopup,
  profileDetailPopup,
  setProfileDetailPopup,
}: {
  setProfilePopup: (value: boolean) => void;
  profileDetailPopup: boolean;
  setProfileDetailPopup: (value: boolean) => void;
}) => {
  const { user, setUser } = useUserStore();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        if (user && user.id) {
          await sendLogoutEvent(user?.id);
        }
        setProfilePopup(false);
        setLoading(false);
        showToast("Logout successfully", "success");
        setUser(null);
      }

      // Redirect to login page after successful logout
      router.push(AppRouter.loginPage);
    } catch (error) {
      setLoading(false);
      showToast("Logout Failed", "error");
    }
  };

  return (
    <div>
      <div
        ref={popupRef}
        className="fixed top-[75px] right-[30px] w-[200px] sm:w-[250px] bg-profileBg z-20 rounded-lg shadow-lg shadow-gray-700/30"
      >
        {user && (
          <div>
            <div
              className="profile  flex justify-start ps-5 items-center gap-3 m-1 h-[50px] sm:h-[70px] rounded-lg cursor-pointer hover:bg-optionBgHover transition-200"
              onClick={() => {
                setProfileDetailPopup(!profileDetailPopup);
                setProfilePopup(false);
              }}
            >
              {/* <img src={user.profileImagePath} alt="" /> */}
              <div className="sm:w-[45px] sm:h-[45px] rounded-full w-10 h-10 max-w-10 max-h-10 overflow-hidden">
                {user?.profileImagePath ? (
                  <img
                    src={user.profileImagePath}
                    alt="Profile"
                    // fill={true}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-lg w-full h-full text-theme" />
                )}
              </div>
              <div>
                <p className="font-bold max-sm:text-sm">
                  {user?.firstName +
                    " " +
                    (user?.middleName ?? "") +
                    " " +
                    user?.lastName}
                </p>
                <p className="max-w-[150px] sm:text-sm text-[10px] truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="mx-5 h-[2px] bg-paginationBorder "></div>
          </div>
        )}
        <div>
          {loading ? (
            <div className="logout flex justify-center items-center gap-3 m-1 h-[40px] sm:h-[52px] rounded-lg">
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin me-2"></div>
              <div className="text-sm sm:text-lg">Logging Out</div>
            </div>
          ) : (
            <div
              className="logout flex justify-center items-center gap-3 m-1 h-[40px] sm:h-[52px] rounded-lg cursor-pointer hover:bg-optionBgHover transition-200"
              onClick={handleLogout}
            >
              <div>
                <LuLogOut className="text-red-500 font-bold text-2xl" />
              </div>
              <div className="text-sm sm:text-lg">Logout</div>
            </div>
          )}
        </div>
      </div>
      <div
        className="fixed inset-0 z-10"
        onClick={() => setProfilePopup(false)}
      ></div>
    </div>
  );
};

export default ProfilePopup;
