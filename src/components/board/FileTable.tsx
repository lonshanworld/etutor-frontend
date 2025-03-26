"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NoResultFound from "../searchbar/NoResultFound";
import { BsThreeDots } from "react-icons/bs";

const files = [
  {
    id: 1,
    filename: "The Goblet of Fire",
    uploadedAt: "3 hours ago",
    uploadedBy: "Harry Potter",
  },
  {
    id: 2,
    filename: "The Prisoner of Azkaban",
    uploadedAt: "4 hours ago",
    uploadedBy: "Hermione Granger",
  },
  {
    id: 3,
    filename: "Hogwarts Letter",
    uploadedAt: "2 hours ago",
    uploadedBy: "Ron Weasley",
  },
  {
    id: 4,
    filename: "Dark Arts Spells",
    uploadedAt: "1 hour ago",
    uploadedBy: "Luna Lovegood",
  },
  {
    id: 5,
    filename: "Quidditch World Cup Highlights",
    uploadedAt: "6 hours ago",
    uploadedBy: "Ginny Weasley",
  },
  {
    id: 6,
    filename: "Secrets of the Marauder's Map",
    uploadedAt: "7 hours ago",
    uploadedBy: "Fred Weasley",
  },
  {
    id: 7,
    filename: "Potions Mastery Guide",
    uploadedAt: "5 hours ago",
    uploadedBy: "Severus Snape",
  },
  {
    id: 8,
    filename: "Magical Creatures: A Comprehensive Guide",
    uploadedAt: "8 hours ago",
    uploadedBy: "Hagrid",
  },
  {
    id: 9,
    filename: "The Triwizard Tournament",
    uploadedAt: "9 hours ago",
    uploadedBy: "Cedric Diggory",
  },
  {
    id: 10,
    filename: "Dumbledore's Army Secret Meeting Minutes",
    uploadedAt: "10 hours ago",
    uploadedBy: "Neville Longbottom",
  },
  {
    id: 11,
    filename: "Horcruxes and Dark Magic",
    uploadedAt: "11 hours ago",
    uploadedBy: "Tom Riddle",
  },
  {
    id: 12,
    filename: "The Tales of Beedle the Bard",
    uploadedAt: "12 hours ago",
    uploadedBy: "Professor Dumbledore",
  },
  {
    id: 13,
    filename: "Famous Witches and Wizards",
    uploadedAt: "13 hours ago",
    uploadedBy: "Professor McGonagall",
  },
  {
    id: 14,
    filename: "The Forbidden Forest: Secrets Revealed",
    uploadedAt: "14 hours ago",
    uploadedBy: "Aragog",
  },
  {
    id: 15,
    filename: "The Last Will and Testament of Sirius Black",
    uploadedAt: "15 hours ago",
    uploadedBy: "Sirius Black",
  },
];

const FileTable = () => {
  return (
    <div>
      <Table className='border-collapse w-full bg-background rounded-t-lg overflow-hidden'>
        <TableHeader className='bg-theme py-3 rounded-lg '>
          <TableRow className=''>
            <TableHead className='max-sm:text-sm w-[70px] ps-5 lg:w-[100px] lg:ps-8 sm:rounded-tl-md text-left'>
              No
            </TableHead>
            <TableHead className='max-sm:text-sm text-left'>
              File Name
            </TableHead>
            <TableHead className='max-sm:text-sm text-left'>
              Uploaded At
            </TableHead>
            <TableHead className='max-sm:text-sm text-left'>
              Uploaded By
            </TableHead>
            <TableHead className='max-sm:text-sm sm:rounded-tr-md'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='max-sm:text-[11px]'>
          {files.length > 0 ? (
            files.map((file, index) => (
              <TableRow
                key={index}
                className='border-[1px] border-tableRowBorder h-[70px]'
              >
                <TableCell className='font-medium ps-5 lg:ps-8'>
                  {index + 1}
                </TableCell>
                <TableCell>{file.filename}</TableCell>
                <TableCell>{file.uploadedAt}</TableCell>
                <TableCell>{file.uploadedBy}</TableCell>
                <TableCell className='flex justify-center items-center mt-1 h-[70px]'>
                  <button className='p-2 rounded-md hover:bg-optionBgHover'>
                    <BsThreeDots />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className='text-center h-[450px]'
              >
                <NoResultFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileTable;
