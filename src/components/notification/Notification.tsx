import NotiLight from "@/assets/svgs/notifications/notiLight.svg";
import NotiDark from "@/assets/svgs/noti.svg";
import { useEffect, useRef, useState } from "react";
import NotiList from "./NotiList";

import Welcome from "@/assets/svgs/notifications/welcome.svg";
import LastLogin from "@/assets/svgs/notifications/lastLogin.svg";
import InactiveAlert from "@/assets/svgs/notifications/inactiveAlert.svg";
import Assign from "@/assets/svgs/notifications/assigned.svg";
import { useThemeStore } from "@/stores/useThemeStore";
import {
  getNotifications,
  readNotification,
} from "@/api/services/notification";
import { twMerge } from "tailwind-merge";

import { MdNotificationsPaused } from "react-icons/md";

const Notification = () => {
  const [isNotiOpen, setNotiOpen] = useState(false);
  const { theme } = useThemeStore();
  const [notiData, setNotiData] = useState<any[]>([]);

  const notiRef = useRef<HTMLDivElement | null>(null);
  const notiOpenRef = useRef<HTMLImageElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notiOpenRef.current &&
      !notiOpenRef.current.contains(event.target as Node) &&
      notiRef.current &&
      !notiRef.current.contains(event.target as Node)
    ) {
      setNotiOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchNoti = async () => {
    const response = await getNotifications();
    console.log("noti", response.data);
    setNotiData(response.data);
  };

  const splitType = (type: string) => {
    const typeArray = type.split("\\");
    return typeArray[typeArray.length - 1].replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  useEffect(() => {
    fetchNoti();
  }, []);
  const openNoti = () => {
    setNotiOpen(!isNotiOpen);
  };

  const readNoti = async (id: number) => {
    const response = await readNotification(null, id);
    console.log("read noti", notiData, response);
    const newNotiList = notiData.filter((noti) => noti.notifiable_id !== id);
    setNotiData(newNotiList);
  };
  return (
    <div className="relative">
      <div className="relative">
        <img
          src={theme === "light" ? NotiLight.src : NotiDark.src}
          className="cursor-pointer"
          ref={notiOpenRef}
          alt=""
          onClick={openNoti}
        />
        {notiData.length > 0 && (
          <div className="absolute top-[5px] left-[17px] w-[6px] h-[6px] bg-red-500 rounded-full"></div>
        )}
      </div>
      {isNotiOpen && (
        <div
          className={twMerge(
            "fixed left-5 top-16 right-5 sm:absolute sm:top-10 sm:left-[-300px] sm:right-0 rounded-lg z-20 bg-notiBg border border-gray-200 shadow-lg min-w-[250px] sm:w-[350px] max-w-[350px] overflow-y-auto p-3 custom-scrollbar",
            notiData.length > 0 ? "h-[500px]" : "h-[300px]"
          )}
          ref={notiRef}
        >
          {notiData.length > 0 &&
            notiData.map((item) => (
              <div key={item.id}>
                <NotiList
                  title={splitType(item.type)}
                  body={item.data.message}
                  onClose={() => readNoti(item.notifiable_id)}
                  createdDate={item.created_at}
                />
              </div>
            ))}

          {notiData.length === 0 && (
            <div className="h-full w-full flex justify-center items-center text-center text-gray-500">
              <div>
                <div className="flex justify-center mb-3">
                  <MdNotificationsPaused className="text-5xl" />
                </div>
                <div className="text-xl font-semibold mb-2">
                  No Notifications Yet
                </div>
                <div className="text-sm w-[300px]">
                  Stay tuned! Notifications about your activity will show up
                  here.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
