"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaUserCircle } from "react-icons/fa";
import NoResultFound from "../../searchbar/NoResultFound";
import CustomButton from "@/components/buttons/Button";
import { PaginationDemo } from "@/components/pagination/Pagination";
import { AppRouter } from "@/router";
import { User } from "@/model/user";
import { useAllocate } from "@/stores/useAllocate";
import TutorAllocationPopup from "@/components/allocate/TutorAllocationPopup";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { twMerge } from "tailwind-merge";

type TableProps = {
  data: any[];
  pageCount: number;
  currentPage: number;
};
const TutorTable = ({ data, pageCount, currentPage }: TableProps) => {
  const { userList, setActiveUser, setUserList } = useAllocate();
  const [isTutorPopupShown, setIsTutorPopupShown] = useState(false);
  const [tutorData, setTutorData] = useState<any[]>([]);
  const { isReadOnly } = useUserStore();
  const showTutorPopup = (user: User) => {
    setIsTutorPopupShown(true);
    setActiveUser(user);
  };
  useEffect(() => {
    setUserList(data);
  }, [data]);
  return (
    <div className="sm:rounded-t-xl overflow-hidden">
      <Table className="border-collapse w-full bg-background sm:rounded-t-lg !overflow-hidden">
        <TableHeader className="bg-theme py-3 rounded-lg ">
          <TableRow className="">
            <TableHead className="max-sm:text-sm w-[70px] ps-5 lg:w-[100px] lg:ps-8 sm:rounded-tl-md text-left">
              No
            </TableHead>
            <TableHead className="max-sm:text-sm text-left">Name</TableHead>
            <TableHead className="max-sm:text-sm text-left">Email</TableHead>
            <TableHead className="max-sm:hidden ps-10 text-left">
              Students
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-sm:text-[11px]">
          {data.length > 0 ? (
            data.map((user, index) => (
              <TableRow
                key={index}
                className="border-[1px] border-tableRowBorder h-[70px]"
              >
                <TableCell className="font-medium ps-5 lg:ps-8">
                  {currentPage > 1 ? currentPage * 10 + (index + 1) : index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="sm:w-[30px] sm:h-[30px] w-[15px] h-[15px] overflow-hidden rounded-full flex items-center">
                      {user.profileImagePath ? (
                        <img
                          src={user.profileImagePath}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      ) : (
                        <FaUserCircle className="text-lg sm:text-3xl text-theme" />
                      )}
                    </div>
                    <p className="truncate">
                      {user.firstName +
                        " " +
                        (user.middleName ?? "") +
                        " " +
                        user.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="ps-10 text-center max-sm:hidden">
                  <div className="flex justify-left items-center gap-3">
                    <div>{user.studentCount}/10</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {/* <CustomButton text="Allocate" type="button" /> */}
                    <button
                      className={twMerge(
                        "bg-theme px-8 py-2 text-white rounded-sm transition-200",
                        isReadOnly
                          ? "opacity-70"
                          : "opacity-100 hover:bg-themeHover "
                      )}
                      onClick={() => showTutorPopup(user)}
                      disabled={isReadOnly}
                    >
                      Allocate
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-[450px]">
                <NoResultFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-3">
        {data && (
          <PaginationDemo
            pageCount={pageCount}
            currentPage={currentPage}
            url={AppRouter.staffAllocateTutor}
          />
        )}
        {/* {!isSearch && (
          <PaginationDemo
            pageCount={pageCount}
            currentPage={currentPage}
            url={getUrl()}
          />
        )} */}
      </div>

      {isTutorPopupShown && (
        <TutorAllocationPopup
          setIsTutorPopupShown={setIsTutorPopupShown}
          setTutorData={setTutorData}
        />
      )}
    </div>
  );
};

export default TutorTable;
