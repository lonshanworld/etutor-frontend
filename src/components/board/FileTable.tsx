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
import { formatTime } from "@/utils/formatData";

const FileTable = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionPopupVisible, setActionPopupVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    // Close popup when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setActionPopupVisible(false);
        setSelectedFile(null); // Clear selected file when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (selectedPage: number) => {
    fetchFiles(selectedPage);
  };

  const handleFileClick = (file: File, event: React.MouseEvent) => {
    setSelectedFile(file);

    // Get the position of the clicked button
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPopupPosition({
      top: rect.top + window.scrollY + rect.height, // Position below the button
      left: rect.left + window.scrollX - 100, // Adjust for alignment (optional)
    });

    setActionPopupVisible((prev) => !prev); // Toggle visibility on click
  };

  const closeActionPopup = () => {
    setActionPopupVisible(false);
    setSelectedFile(null); // Clear selected file when closing popup
  };

  const handleDownload = (file: File) => {
    // Assuming the file has a download_url property
    window.open(file.url_link, "_blank");
  };

  const handleDelete = (file: File) => {
    if (
      window.confirm(`Are you sure you want to delete "${file.file_name}"?`)
    ) {
      // Call your delete API here
      console.log("File deleted:", file.id);
      // Fetch files again after deletion
      fetchFiles();
    }
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
                <TableCell>{formatTime(file.created_at)}</TableCell>
                <TableCell>{file.user?.name}</TableCell>
                <TableCell className='text-center'>
                  <button
                    ref={buttonRef}
                    className='p-2 rounded-md hover:bg-optionBgHover'
                    onClick={(e) => handleFileClick(file, e)}
                  >
                    <BsThreeDots />
                  </button>
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

      {/* Action Popup */}
      {selectedFile && (
        <div
          ref={popupRef}
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <ActionPopup
            isOpen={actionPopupVisible}
            onClose={closeActionPopup}
            file={selectedFile}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default FileTable;
