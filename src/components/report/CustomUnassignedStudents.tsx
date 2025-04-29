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
import NoResultFound from "../searchbar/NoResultFound";
import { PaginationDemo } from "../pagination/Pagination";
import { getAllStudents, getUnassignedStudents } from "@/api/services/report";
import useLoading from "@/stores/useLoading";
import { useToast } from "@/stores/useToast";
import { AppRouter } from "@/router";
import {
  unassignedStudentFromJson,
  UnassignStudentModel,
} from "@/model/unassignStudentModel";
import { formatName } from "@/utils/formatData";
import SearchUser from "../chat/SearchUser";
import { useRouter } from "next/navigation";
import ReportDropDownSelect from "./ReportDropDownSelect";

const statusList = ["All", "Unassign"];

export default function CustomUnassignTable({
  numpage,
  isSmallScreen = false,
  search,
  type,
}: {
  numpage?: number;
  isSmallScreen?: boolean;
  search?: string;
  type?: string;
}) {
  const [users, setUsers] = useState([] as UnassignStudentModel[]);
  const page = numpage || 1;
  const [pageCount, setPageCount] = useState(1);
  const { isLoading, showLoading, hideLoading } = useLoading();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [checkUnassign, setCheckUnassign] = useState(gettype(type));
  const router = useRouter();
  const { showToast } = useToast();

  function gettype(value?: string) {
    if (value && value.toLowerCase() === "unassign") {
      return statusList[1];
    } else {
      return statusList[0];
    }
  }

  function getReversetype(value?: string) {
    if (value && value === statusList[1]) {
      return "unassign";
    } else {
      return "";
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const response =
          type?.toLowerCase() === "unassign"
            ? await getUnassignedStudents(page, search)
            : await getAllStudents(page, search);
        console.log("");
        const userList: UnassignStudentModel[] = [];
        response.data.map((item: any) => {
          const oneUser = unassignedStudentFromJson(item);
          userList.push(oneUser);
        });
        setUsers(userList);
        setPageCount(response.meta.last_page);
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Error in loading users. Please try again later", "error");
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, [search, type]);

  function restartSearch() {
    router.replace(
      `${AppRouter.staffUnassignStudent}?page=1&search=${searchInputRef.current?.value ?? ""}&type=${getReversetype(checkUnassign ?? "")}`
    );
  }

  function searchClick() {
    restartSearch();
  }

  return (
    <div
      className={`w-full h-full overflow-y-auto custom-scrollbar pt-2 ${isSmallScreen === true ? "pb-0" : "pb-20"}`}
    >
      <div className="w-full sm:w-1/2 flex flex-row gap-3 mb-2">
        <div>
          <SearchUser inputRef={searchInputRef} searchClick={searchClick} />
        </div>
        <div className="w-28">
          <ReportDropDownSelect
            selectedValue={checkUnassign}
            valueList={statusList}
            onChange={(value: string) => {
              setCheckUnassign(value);
              router.replace(
                `${AppRouter.staffUnassignStudent}?page=1&search=${search ?? searchInputRef.current?.value ?? ""}&type=${getReversetype(value)}`
              );
            }}
          />
        </div>
      </div>
      <Table
        className={`border-collapse w-full bg-background sm:rounded-t-lg !overflow-hidden ${isSmallScreen !== true && "mb-4"}`}
      >
        <TableHeader className="bg-theme rounded-lg w-full ">
          <TableRow className={`${isSmallScreen === true ? "h-0" : "h-12"}`}>
            <TableHead className="w-[5%]  sm:rounded-tl-md text-center">
              No
            </TableHead>
            <TableHead className="w-[25%] text-center">Name</TableHead>
            <TableHead className="w-[44%] text-center">Email</TableHead>
            <TableHead className="w-[13%] text-center">Assign Status</TableHead>
            <TableHead className="w-[13%] text-center">Active Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-sm:text-[11px]">
          <>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className={`text-center ${isSmallScreen === true ? "h-[150px]" : "h-[450px]"}`}
                >
                  <span>Loading ... </span>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {users.length > 0 ? (
                  <>
                    {isSmallScreen === true &&
                      users.slice(0, 4).map((user, index) => (
                        <TableRow
                          key={index}
                          className={`border-[1px] border-tableRowBorder h-[20px]`}
                        >
                          <TableCell className="font-medium text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            <p className="truncate text-center">
                              {formatName(
                                user.first_name,
                                user.middle_name,
                                user.last_name
                              )}
                            </p>
                          </TableCell>
                          <TableCell className="text-center ">
                            {user.email}
                          </TableCell>

                          <TableCell className=" text-center">
                            {user.tutoring_session_status}
                          </TableCell>
                          <TableCell className=" text-center">
                            {user.getLastActivity}
                          </TableCell>
                        </TableRow>
                      ))}
                    {isSmallScreen !== true &&
                      users.map((user, index) => (
                        <TableRow
                          key={index}
                          className={`border-[1px] border-tableRowBorder h-[70px] py-0"`}
                        >
                          <TableCell className="font-medium text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            <p className="truncate text-center">
                              {formatName(
                                user.first_name,
                                user.middle_name,
                                user.last_name
                              )}
                            </p>
                          </TableCell>
                          <TableCell className="text-center ">
                            {user.email}
                          </TableCell>

                          <TableCell className=" text-center">
                            {user.tutoring_session_status}
                          </TableCell>
                          <TableCell className=" text-center">
                            {user.getLastActivity}
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className={`text-center ${isSmallScreen === true ? "h-[150px]" : "h-[450px]"}`}
                    >
                      {isSmallScreen === true ? (
                        <span>No Result Found</span>
                      ) : (
                        <NoResultFound />
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </>
        </TableBody>
      </Table>
      {isSmallScreen === true && (
        <span className="text-3xl tracking-widest leading-none font-bold text-end">
          {" "}
          ...{" "}
        </span>
      )}
      {isSmallScreen !== true && (
        <PaginationDemo
          pageCount={pageCount}
          currentPage={page}
          url={AppRouter.staffUnassignStudent}
          remainingUrl="&search=&type="
        />
      )}
    </div>
  );
}
