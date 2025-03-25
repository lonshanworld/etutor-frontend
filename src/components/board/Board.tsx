"use client";

import { useState } from "react";
import PostSection from "./PostTab";
import FileSection from "./FileTab";
import TopBar from "./TopBar";
import NewPostPopup from "./modals/NewPostModal";

const Board = () => {
  const [selectedSection, setSelectedSection] = useState<"post" | "file">(
    "post"
  );
  const [isNewPostModalOpen, setNewPostModalOpen] = useState(false);

  return (
    <div className='w-full h-full relative'>
      <div className='flex flex-col absolute top-0 left-0 right-0 bottom-0 md:pt-2 md:pl-4 px-0 h-full'>
        <div className='relative'>
          <TopBar
            viewNewPost={() => setNewPostModalOpen(true)}
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
          />
        </div>

        {selectedSection === "post" ? <PostSection /> : <FileSection />}

        {isNewPostModalOpen && (
          <NewPostPopup
            onClose={() => setNewPostModalOpen(false)}
            profileUrl='https://i.pravatar.cc/300?img=19'
            username='Username'
          />
        )}
      </div>
    </div>
  );
};

export default Board;
