"use client";

import { useUserStore } from "@/stores/useUserStore";
import { FiEdit } from "react-icons/fi";

interface Props {
  onSelectTab: (tab: "blog" | "file") => void;
  selectedTab: "blog" | "file";
  viewCreateNewBlog: () => void;
}

const NavBar = ({
  onSelectTab,
  selectedTab,
  viewCreateNewBlog: viewNewBlog,
}: Props) => {
  // Scroll to top function
  const { isReadOnly } = useUserStore();

  const scrollToTop = () => {
    const container = document.getElementById("postContainer");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // handle Post button
  const handleBlog = () => {
    onSelectTab("blog");
    scrollToTop();
  };

  return (
    <div className="flex items-center md:w-1/2 w-full justify-between bg-secondaryBackground px-3 mt-1  py-2 absolute top-0 left-0 z-5">
      <div className="flex gap-4 h-full">
        <div className="flex items-baseline text-xl gap-4 h-full py-1">
          <div
            className={`p-1 cursor-pointer border-b-2 ${
              selectedTab === "blog"
                ? "border-b-theme text-theme"
                : "text-secondaryText border-transparent"
            }`}
            onClick={handleBlog}
          >
            Blog
          </div>
          <div
            className={`p-1 cursor-pointer border-b-2  ${
              selectedTab === "file"
                ? "border-b-theme text-theme"
                : "text-secondaryText border-transparent"
            }`}
            onClick={() => onSelectTab("file")}
          >
            File
          </div>
        </div>
      </div>
      <div></div>
      {selectedTab === "blog" && (
        <button
          className={`bg-theme rounded-sm px-7 py-2 text-white flex items-center gap-2 ${isReadOnly && "pointer-events-none opacity-50"}`}
          onClick={viewNewBlog}
          disabled={isReadOnly}
        >
          <FiEdit size={20} /> POST
        </button>
      )}
    </div>
  );
};

export default NavBar;
