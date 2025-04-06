import Close from "@/assets/svgs/notifications/close.svg";

const NotiList = ({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: any;
}) => {
  return (
    <div className="relative flex justify-start items-center gap-5 p-2 border-b-2 border-gray-300">
      <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
        <img src={icon.src} alt="" />
      </div>
      <div>
        <div className="text-lg font-bold">{title}</div>
        <div className="">{body}</div>
      </div>
      <div className="absolute top-3 right-1">
        <img src={Close.src} alt="" />
      </div>
    </div>
  );
};

export default NotiList;
