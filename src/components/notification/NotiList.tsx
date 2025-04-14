import Close from "@/assets/svgs/notifications/close.svg";
import { ISOStringFormat } from "date-fns";
import { useEffect } from "react";

const NotiList = ({
  title,
  body,
  icon,
  onClose,
  createdDate,
}: {
  title: string;
  body: string;
  icon: any;
  onClose: any;
  createdDate: ISOStringFormat;
}) => {
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

  return (
    <div className="relative flex justify-start items-center gap-5 p-2 border-b-2 border-gray-300">
      <div className="bg-gray-300 rounded-full w-12 h-12 min-w-12 flex items-center justify-center">
        <img src={icon.src} alt="" />
      </div>
      <div>
        <div className="text-lg font-bold">{title}</div>
        <div className="">{body}</div>
        <div className="text-sm">{getTimeOrDate(createdDate)}</div>
      </div>
      <div className="absolute top-3 right-1 cursor-pointer" onClick={onClose}>
        <img src={Close.src} alt="" />
      </div>
    </div>
  );
};

export default NotiList;
