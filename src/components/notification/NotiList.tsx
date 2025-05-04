"use client";
import Close from "@/assets/svgs/notifications/close.svg";
import { ISOStringFormat } from "date-fns";
import { useEffect, useState } from "react";

import Welcome from "@/assets/svgs/notifications/welcome.svg";
import LastLogin from "@/assets/svgs/notifications/lastLogin.svg";
import InactiveAlert from "@/assets/svgs/notifications/inactiveAlert.svg";
import Assign from "@/assets/svgs/notifications/assigned.svg";
import Unassign from "@/assets/images/notifications/Unassign.png";
import Logout from "@/assets/images/notifications/Logout.png";
import { twMerge } from "tailwind-merge";

const NotiList = ({
  title,
  body,
  onClose,
  createdDate,
  isLastItem = false,
}: {
  title: string;
  body: string;
  onClose: any;
  createdDate: ISOStringFormat;
  isLastItem?: boolean;
}) => {
  const [notiType, setNotiType] = useState<string>("");

  function getTimeOrDate(inputDate: ISOStringFormat) {
    const today = new Date();
    const date = new Date(inputDate);

    // Normalize the dates by setting time to midnight to compare only the date part
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (today.getTime() === date.getTime()) {
      // Return time in HH:mm format (24-hour)
      const hours = new Date(inputDate).getHours().toString().padStart(2, "0");
      const minutes = new Date(inputDate)
        .getMinutes()
        .toString()
        .padStart(2, "0");
      return `${hours}:${minutes}`;
    } else {
      const month = new Date(inputDate).getMonth() + 1;
      const day = new Date(inputDate).getDate();
      return `${day}/${month}`;
    }
  }

  const getType = () => {
    setNotiType(title);
  };

  useEffect(() => {
    getType();
  }, []);

  const getIcon = () => {
    switch (notiType) {
      case "Welcome":
        return Welcome.src;
      case "Last":
        return LastLogin.src;
      case "Inactive":
        return InactiveAlert.src;
      case "New_student":
        return Assign.src;
      case "Unassignment":
        return Unassign.src;
      case "Logout":
        return Logout.src;
      default:
        return Welcome.src;
    }
  };

  return (
    <div
      className={twMerge(
        "relative flex justify-start items-center gap-5 p-2 pt-6 max-w-[350px] w-full",
        !isLastItem && "border-b-2 border-gray-300"
      )}
    >
      <div className="bg-gray-300 rounded-full w-12 h-12 min-w-12 flex items-center justify-center">
        <img src={getIcon()} alt="" />
      </div>
      <div>
        <div className="text-lg font-bold">{title}</div>
        <div className="max-w-[350px] text-wrap">{body}</div>
        <div className="text-sm">{getTimeOrDate(createdDate)}</div>
      </div>
      <div className="absolute top-3 right-1 cursor-pointer" onClick={onClose}>
        <img src={Close.src} alt="" />
      </div>
    </div>
  );
};

export default NotiList;
