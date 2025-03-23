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
    <>
      <div className='flex flex-col md:pt-2 max-h-svh pt-2'>
        <TopBar
          viewNewPost={() => setNewPostModalOpen(true)}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />
        {selectedSection === "post" ? <PostSection /> : <FileSection />}
        {isNewPostModalOpen && (
          <NewPostPopup
            onClose={() => setNewPostModalOpen(false)}
            profileUrl='https://i.pravatar.cc/300?img=19'
            username='Username'
          />
        )}
      </div>
    </>
  );
};

export default Board;
