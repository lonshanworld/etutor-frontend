"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import NoResultFound from "../searchbar/NoResultFound";
import { getFiles } from "@/api/services/blogs";
import { File } from "@/model/blog";
import { PaginationLMT } from "../pagination/PaginationLMT";
import ActionPopup from "./popup/ActionPopup";
import { formatTimeStamp } from "@/utils/formatData";
import { MdOutlineOpenInNew } from "react-icons/md";

const FileTable = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFiles = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getFiles(page);
      setFiles(response.files);
      setPageCount(response.meta.last_page);
      setCurrentPage(response.meta.current_page);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handlePageChange = (selectedPage: number) => {
    fetchFiles(selectedPage);
  };

  return (
    <div className='sm:rounded-t-xl overflow-hidden'>
      <Table className='border-collapse w-full bg-background sm:rounded-t-lg'>
        <TableHeader className='bg-theme py-3'>
          <TableRow>
            <TableHead className='ps-5 w-[70px] text-left'>No</TableHead>
            <TableHead className='text-left'>File Name</TableHead>
            <TableHead className='text-left'>Uploaded At</TableHead>
            <TableHead className='text-left'>Uploaded By</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ?
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-center py-10'
              >
                Loading...
              </TableCell>
            </TableRow>
          : files.length > 0 ?
            files.map((file, index) => (
              <TableRow
                key={file.id}
                className='border border-tableRowBorder'
              >
                <TableCell className='ps-5'>{index + 1}</TableCell>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>{formatTimeStamp(file.created_at)}</TableCell>
                <TableCell>{file.user?.name}</TableCell>
                <TableCell className='text-center'>
                  <a
                    href={file.url_link}
                    target='_blank'
                    className='flex items-center justify-center cursor-pointer'
                  >
                    <MdOutlineOpenInNew className='text-secondaryText' />
                  </a>
                </TableCell>
              </TableRow>
            ))
          : <TableRow>
              <TableCell
                colSpan={5}
                className='text-center h-[450px]'
              >
                <NoResultFound />
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className='flex justify-end mt-3'>
        <PaginationLMT
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default FileTable;
