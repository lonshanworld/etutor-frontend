"use client";

import FileTable from "./FileTable";

const FileTab = () => {
  return (
    <div className='w-full h-full sm:w-[99%] pt-16 mt-2'>
      <div className='z-0 overflow-y-auto custom-scrollbar h-full'>
        <FileTable />
      </div>
    </div>
  );
};

export default FileTab;
