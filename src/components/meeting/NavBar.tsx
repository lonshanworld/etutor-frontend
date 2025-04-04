"use client";

interface Props {
  onSelectTab: (section: "active" | "history") => void; // Accept prop to change selected section
  selectedTab: "active" | "history"; // Track the currently selected section
}

const NavBar = ({ onSelectTab, selectedTab }: Props) => {
  return (
    <div className='flex items-baseline gap-4 py-1 pb-4 text-lg'>
      <div
        className={`p-1 cursor-pointer border-b-2 ${
          selectedTab === "active" ?
            "border-b-theme text-theme"
          : "text-secondaryText border-transparent"
        }`}
        onClick={() => onSelectTab("active")}
      >
        Active Meetings
      </div>
      <div
        className={`p-1 cursor-pointer border-b-2  ${
          selectedTab === "history" ?
            "border-b-theme text-theme"
          : "text-secondaryText border-transparent"
        }`}
        onClick={() => onSelectTab("history")}
      >
        Meeting History
      </div>
    </div>
  );
};

export default NavBar;
