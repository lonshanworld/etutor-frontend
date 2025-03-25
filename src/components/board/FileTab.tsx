"use client";

import React from "react";
import TopBar from "./TopBar";
import TableDemo from "../table/Table";
import FileTable from "./FileTable";

const FileTab = () => {
  return (
    <div className='w-full h-svh sm:w-[99%] mx-4 mt-4 min-h-svh overflow-y-auto pt-12'>
      <FileTable />
    </div>
  );
};

export default FileTab;
