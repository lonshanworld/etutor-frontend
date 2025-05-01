"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import NoResultFound from "../searchbar/NoResultFound";
import { PaginationDemo } from "../pagination/Pagination";
import { getActiveUsers } from "@/api/services/report";
import useLoading from "@/stores/useLoading";
import { useToast } from "@/stores/useToast";
import { ReportActiveUser, reportActiveUserFromJson } from "@/model/reportActiveUser";
import { AppRouter } from "@/router";



export default function CustomTable(
  {
    numpage,
    isSmallScreen = false,
  } : {
    numpage? : number;
    isSmallScreen? : boolean;
  }
){
    const [users, setUsers] = useState([] as ReportActiveUser[]);
  const page = numpage || 1;
    const [pageCount, setPageCount] = useState(1);
    const {isLoading,showLoading, hideLoading} = useLoading();
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
                showToast("Error in loading users. Please try again later", "error");
            }finally{
                hideLoading();
            }
        };
        fetchData();
    },[numpage]);

    return (
        <div
        className={`w-full h-full overflow-y-auto custom-scrollbar pt-2 ${isSmallScreen === true ? "pb-0" : "pb-20"}`}>
             <Table className={`border-collapse w-full bg-background sm:rounded-t-lg !overflow-hidden ${isSmallScreen !== true && "mb-4"}`}>
        <TableHeader className="bg-theme rounded-lg ">
          <TableRow className={`${isSmallScreen === true ? "h-0" : "h-12"}`}>
            <TableHead className="max-sm:text-sm w-[40px]  lg:w-[100px]  sm:rounded-tl-md text-center">
              No
            </TableHead>
            <TableHead className="max-sm:text-sm w-[100px] sm:w-[150px] md:w-[300px] text-center">Name</TableHead>
            <TableHead className="max-sm:text-sm w-[150px] sm:w-[300px] md:w-[600px] text-center">Email</TableHead>
            <TableHead className="text-center">
                Visit Count
            </TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody className="max-sm:text-[11px]">
        <>
              {
                isLoading 
                ? 
                <TableRow>
                  <TableCell colSpan={4} className={`text-center ${isSmallScreen === true ? "h-[150px]" : "h-[450px]"}`}>
                    <span>Loading ... </span>
                  </TableCell>
                </TableRow> 
                :
                <>
                  {users.length > 0 ? (
            <>
              {
                isSmallScreen === true && users.slice(0,4).map((user, index) => (
                  <TableRow
                    key={index}
                    className={`border-[1px] border-tableRowBorder h-[20px]`}
                  >
                    <TableCell className="font-medium text-center">
                    {(page - 1) * 10 + (index + 1)}
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
              }
              {
                isSmallScreen !== true && users.map((user, index) => (
                  <TableRow
                    key={index}
                    className={`border-[1px] border-tableRowBorder h-[70px] py-0"`}
                  >
                    <TableCell className="font-medium text-center">
                      {(page - 1) * 10 + (index + 1)}
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
              }
            </>
          ) : (
            <TableRow>
            <TableCell colSpan={4} className={`text-center ${isSmallScreen === true ? "h-[150px]" : "h-[450px]"}`}>
              {
                isSmallScreen === true ? <span>No Result Found</span> : <NoResultFound />
              }
            </TableCell>
          </TableRow> 
          )}
                </>
              }
            </>
          

          
        </TableBody>
      </Table>
      {
        isSmallScreen === true && <span className="text-3xl tracking-widest leading-none font-bold text-end"> ... </span>
      }
      {
        isSmallScreen !== true && <PaginationDemo
        pageCount={pageCount}
        currentPage={page}
        url={AppRouter.staffActiveUsers}
      />
      }
        </div>
    );
}