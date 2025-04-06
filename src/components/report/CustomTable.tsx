"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/model/user";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaUserCircle } from "react-icons/fa";
import StatusIcon from "../statusicon/StatusIcon";
import NoResultFound from "../searchbar/NoResultFound";
import { Pagination } from "../ui/pagination";
import { PaginationDemo } from "../pagination/Pagination";
import { getActiveUsers } from "@/api/services/report";
import useLoading from "@/stores/useLoading";
import { useToast } from "@/stores/useToast";
import { ReportActiveUser, reportActiveUserFromJson } from "@/model/reportActiveUser";
import { AppRouter } from "@/router";



export default function CustomTable(
  {
    numpage,
  } : {
    numpage? : number;
  }
){
    const {user} = useUserStore();
    const [users, setUsers] = useState([] as ReportActiveUser[]);
  const page = numpage || 1;
    const [pageCount, setPageCount] = useState(1);
    const {showLoading, hideLoading} = useLoading();
    const {showToast} = useToast();

    useEffect(()=>{
        const fetchData = async () => {
            try {
              showLoading();
                const response = await getActiveUsers(page);
                const userList : ReportActiveUser[] = [];
                response.data.map((item:any) => {
                  const oneUser = reportActiveUserFromJson(item);
                  userList.push(oneUser);
                });
                setUsers(userList);
                setPageCount(response.meta.last_page);  
            } catch (error) {
                console.error("Error fetching data:", error);
                showToast("Error in loading users. Please try again later", "Error");
            }finally{
                hideLoading();
            }
        };
        fetchData();
    },[]);

    return (
        <div
        className="w-full h-full pb-20 overflow-y-auto custom-scrollbar">
             <Table className="border-collapse w-full bg-background sm:rounded-t-lg !overflow-hidden">
        <TableHeader className="bg-theme py-3 rounded-lg ">
          <TableRow className="">
            <TableHead className="max-sm:text-sm w-[40px]  lg:w-[100px]  sm:rounded-tl-md text-center">
              No
            </TableHead>
            <TableHead className="max-sm:text-sm w-[100px] sm:w-[150px] md:w-[300px]  text-center">Name</TableHead>
            <TableHead className="max-sm:text-sm w-[150px] sm:w-[300px] md:w-[600px] text-center">Email</TableHead>
            <TableHead className="text-center">
                Visit Count
            </TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody className="max-sm:text-[11px]">
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow
                key={index}
                className="border-[1px] border-tableRowBorder h-[70px]"
              >
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell  className="font-medium">
                <p className="truncate text-center">
                      {user.name}
                    </p>
                </TableCell>
                <TableCell className="w-[300px] md:w-[400px] text-center ">{user.email}</TableCell>
                <TableCell  className=" text-center">
                   {user.visit_count}
                </TableCell>
                
               
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-[450px]">
                <NoResultFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationDemo
                  pageCount={pageCount}
                  currentPage={page}
                  url={AppRouter.staffActiveUsers}
                />
        </div>
    );
}