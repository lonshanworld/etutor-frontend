"use client";

import { useState } from "react";
import BlogTab from "./BlogTab";
import FileTab from "./FileTab";
import NavBar from "./NavBar";

const Board = () => {
  const [selectedTab, setSelectedTab] = useState<"blog" | "file">("blog");
  const [isCreateNewBlogModalOpen, setCreateNewBlogModalOpen] = useState(false);

  return (
    <div className='w-full h-full relative'>
      <div className='flex flex-col absolute top-0 left-0 right-0 bottom-0 md:pl-4 px-0 h-full'>
        <div className='relative'>
          <NavBar
            viewCreateNewBlog={() => setCreateNewBlogModalOpen(true)}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        </div>

        {selectedTab === "blog" ?
          <BlogTab
            isNewPostModalOpen={isCreateNewBlogModalOpen}
            setNewPostModalOpen={setCreateNewBlogModalOpen}
          />
        : <FileTab />}
      </div>
    </div>
  );
};

export default Board;
