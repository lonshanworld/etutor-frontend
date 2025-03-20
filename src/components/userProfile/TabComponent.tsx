import { twMerge } from "tailwind-merge";

type Props = {
  activeTab: string | null;
  setActiveTab: (value: string) => void;
  tabs: string[];
};

const TabComponent = ({ activeTab, setActiveTab, tabs }: Props) => {
  return (
    <div>
      <div className="flex space-x-10">
        {tabs.map((tab, index) => (
          <button
            className={twMerge(
              "max-sm:text-sm font-bold py-2 col-span-2 border-b-2 cursor-pointer ",
              activeTab === tab
                ? "text-theme border-theme"
                : "border-gray-600 text-gray-600"
            )}
            onClick={() => setActiveTab(tab)}
            key={index}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="h-[2px] -mt-[2px] bg-backgroundOpposite w-full"></div>
    </div>
  );
};

export default TabComponent;
