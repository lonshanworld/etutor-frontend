import NotiLight from "@/assets/svgs/notifications/notiLight.svg";
import NotiDark from "@/assets/svgs/noti.svg";
import { useThemeStore } from "@/stores/useThemeStore";
import Notification from "./Notification";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { getNotifications } from "@/api/services/notification";

const NotiIcon = () => {
  const { theme } = useThemeStore();
  const notiOpenRef = useRef<HTMLImageElement>(null);
  const [isNotiOpen, setNotiOpen] = useState(false);
  const [notiData, setNotiData] = useState<any[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    getNoti();
  }, []);

  const getNoti = async () => {
    const response = await getNotifications(1);
    if (response?.data) {
      setNotiData(response.data);
    }
  };

  // Clear notifications when user logs out
  useEffect(() => {
    if (!user) {
      setNotiData([]);
    }
  }, [user]);

  return (
    <div className="relative">
      <img
        src={theme === "light" ? NotiLight.src : NotiDark.src}
        className="cursor-pointer"
        ref={notiOpenRef}
        alt=""
        onClick={() => user && setNotiOpen(!isNotiOpen)} // Only open if user exists
      />
      {user &&
        notiData.length > 0 && ( // Only show indicator if user exists
          <div className="absolute top-[5px] left-[17px] w-[6px] h-[6px] bg-red-500 rounded-full"></div>
        )}
      {isNotiOpen &&
        user && ( // Only show notifications if user exists
          <Notification
            isNotiOpen={isNotiOpen}
            setNotiOpen={setNotiOpen}
            notiData={notiData}
            setNotiData={setNotiData}
          />
        )}
    </div>
  );
};

export default NotiIcon;
