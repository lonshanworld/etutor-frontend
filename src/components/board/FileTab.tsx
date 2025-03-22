"use client";

import React from "react";
import TopBar from "./TopBar";
import TableDemo from "../table/Table";
import FileTable from "./FileTable";

const FileTab = () => {
  return (
    <div className='w-full h-svh sm:w-[97%] mx-4 mt-4 min-h-screen overflow-y-auto'>
      <FileTable />
    </div>
  );
};

export default FileTab;
