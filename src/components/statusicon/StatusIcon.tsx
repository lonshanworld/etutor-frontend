export default function StatusIcon({
  status,
  activeDays,
}: {
  status: string;
  activeDays: number;
}) {
  const getActiveStatusColor = () => {
    let background = "";
    if (status === "deactivated") {
      background = "bg-red-500";
    } else {
      if (activeDays > 28) {
        background = "bg-red-300";
      } else if (activeDays < 1) {
        background = "bg-green-500";
      } else {
        background = "bg-gray-300";
      }
    }
    return `w-[13px] h-[13px] rounded-full ${background}`;
  };
  return <div className={getActiveStatusColor()}></div>;
}
