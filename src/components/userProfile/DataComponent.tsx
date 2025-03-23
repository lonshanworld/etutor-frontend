import { useUserStore } from "@/stores/useUserStore";
import { twMerge } from "tailwind-merge";
import { UserType } from "./UserProfile";

const DataComponent = ({ data }: { data: UserType[] | null }) => {
  const { showDetail } = useUserStore();
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
              {item.value ? item.value : "-"}
            </p>
          </div>
        ))}
    </div>
  );
};

export default DataComponent;
