import { useUserStore } from "@/stores/useUserStore";
import { twMerge } from "tailwind-merge";
import { UserType } from "./UserProfile";
import { useMajor } from "@/stores/useMajor";
import { dataLabels } from "./profileConstants";

const DataComponent = ({
  data,
  showDetail,
}: {
  data: UserType[] | null;
  showDetail: boolean;
}) => {
  const { majors, subjects } = useMajor();

  const getName = (data: any[], id: number) => {
    const selectedItem = data.filter((item) => item.id === id);
    return selectedItem[0].name ?? "-";
  };

  return (
    <div
      className={twMerge(
        "my-5 grid sm:grid-rows-3 sm:grid-cols-2 items-center",
        !showDetail && "gap-x-10"
      )}
    >
      {data &&
        data.map((item, index) => (
          <div
            className={twMerge(
              "row-span-1",
              showDetail ? "mb-4" : "mb-6 flex justify-between items-center"
            )}
            key={index}
          >
            <p
              className={twMerge(
                "font-bold text-gray-600 text-base",
                showDetail ? "mb-2" : ""
              )}
            >
              {item.label}
            </p>
            <p className="text-sm text-gray-500 font-bold">
              {item.label === dataLabels.major
                ? getName(majors, item.value)
                : item.label === dataLabels.subject
                  ? getName(subjects, item.value)
                  : item.value
                    ? item.value
                    : "-"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default DataComponent;
