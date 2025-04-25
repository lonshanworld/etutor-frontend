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
import useLoading from "@/stores/useLoading";
import { useToast } from "@/stores/useToast";
import { AppRouter } from "@/router";
import { unassignedStudentFromJson, UnassignStudentModel } from "@/model/unassignStudentModel";
import { formatName } from "@/utils/formatData";
import { ChatMessageCount, chatMessageCountFromJson } from "@/model/chatMessageCount";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import SearchUser from "../chat/SearchUser";
import ReportDropDownSelect from "./ReportDropDownSelect";
import { useRouter } from "next/navigation";
import { getChatMessageAll, getChatMessageStudent, getChatMessageTutor } from "@/api/services/report";

const typeList = ["All", "Tutor", "Student"];
const timeList = ["All", "7 days", "28 days"];

export default function CustomMessageTable(
  {
    numpage,
    search,
    duration,
    type,
    isSmallScreen = false,
  } : {
    numpage? : number;
    search? : string ;
    duration? : string;
    type? : string;
    isSmallScreen? : boolean;
  }
){
    const [users, setUsers] = useState([] as ChatMessageCount[]);
  const page = numpage || 1;
    const [pageCount, setPageCount] = useState(1);
    const {isLoading,showLoading, hideLoading} = useLoading();
    const {showToast} = useToast();
    const getMessageCount = useMutation(api.message.getMessageCountBySender);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState(getReverseType(type));
    const [selectedTime, setSelectedTime] = useState(getReverseDay(duration));
    const router = useRouter();

    function getDay(value? : string){
      if(value && value === timeList[1]){
        return "7d";
      }else if (value && value === timeList[2]){
        return '28d';
      }else{
        return "";
      }
    }

    function getReverseDay(value? : string){
      if(value && value === '7d'){
        return timeList[1];
      }else if (value && value === '28d'){
        return timeList[2];
      }else{
        return timeList[0];
      }
    }

    function getType(value : string){
      if(value && value === typeList[1]){
        return "tutor";
      }else if(value && value === typeList[2]){
        return "student";
      }else{
        return "";
      }
    }

    function getReverseType(value? : string){
      if(value && value.toLowerCase() === "tutor"){
        return typeList[1];
      }else if(value && value.toLowerCase() === "student"){
        return typeList[2];
      }else{
        return typeList[0];
      }
    }

    async function getResponse() : Promise<any> {
      let response;
      if(type === "tutor"){
        response = await getChatMessageTutor(page, search);
      }else if(type === "student"){
        response = await getChatMessageStudent(page, search);
      }else{
        response = await getChatMessageAll(page, search);
      }

      return response;
    }

    useEffect(()=>{
      const fetchData = async () => {
          try {
            showLoading();
              const response = await getResponse();
              const userList: ChatMessageCount[] = await Promise.all(
                  response.users.map(async (item : any) => {
                    const oneUser = chatMessageCountFromJson(item);
                    console.log("checking each user", oneUser);
                    const message_count = await getMessageCount({ senderId: oneUser.id, timeRange : duration ?? "" });
          
                    return {
                      ...oneUser,
                      message_count,
                    };
                  })
                );
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
      if (search && searchInputRef.current) {
        searchInputRef.current.value = search;
      }
      
  },[search, duration, type]);

    function restartSearch(){
      router.replace(`${AppRouter.staffMessage}?page=1&search=${searchInputRef.current?.value ?? ""}&duration=${getDay(selectedTime ?? "")}&type=${getType(selectedType ?? "")}`)
    }


    function searchClick(){
      restartSearch();
    }



    return (
        <div
        className={`w-full h-full text-sm overflow-y-auto custom-scrollbar pt-2 ${isSmallScreen === true ? "pb-0" : "pb-20"}`}>
          <div
          className="w-full sm:w-1/2 flex flex-row gap-3 mb-2">
            <div>
              <SearchUser 
              inputRef={searchInputRef}
              searchClick={searchClick}
              />
            </div>
            <div
            className="w-28">
              <ReportDropDownSelect
              selectedValue={selectedType}
              valueList={typeList}
              onChange={(value : string)=>{
                setSelectedType(value);
                router.replace(`${AppRouter.staffMessage}?page=1&search=${ search ?? searchInputRef.current?.value ?? "" }&duration=${getDay(selectedTime ?? "")}&type=${getType(value)}`)
              }} />
            </div>
            <div
            className="w-28">
              <ReportDropDownSelect
              selectedValue={selectedTime}
              valueList={timeList}
              onChange={(value : string)=>{
                setSelectedTime(value);
                router.replace(`${AppRouter.staffMessage}?page=1&search=${searchInputRef.current?.value ?? ""}&duration=${getDay(value)}&type=${getType(selectedType ?? "")}`)
              }} />
            </div>
          </div>
             <Table className={`border-collapse w-full bg-background sm:rounded-t-lg !overflow-hidden ${isSmallScreen !== true && "mb-4"}`}>
        <TableHeader className="bg-theme rounded-lg ">
          <TableRow className={`${isSmallScreen === true ? "h-0" : "h-12"}`}>
            <TableHead className="w-[5%]  sm:rounded-tl-md text-center">
              No
            </TableHead>
            <TableHead className="w-[25%] text-center">Name</TableHead>
            <TableHead className="w-[45%] text-center">Email</TableHead>
            <TableHead className="w-[10%] text-center">
                Role
            </TableHead>
            <TableHead className="w-[15%] text-center">
                Msg Count
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
                      {index + 1}
                    </TableCell>
                    <TableCell  className="font-medium">
                    <p className="truncate text-center">
                    {formatName(user.first_name, user.middle_name, user.last_name)} 
                        </p>
                    </TableCell>
                    <TableCell className="text-center ">{user.email}</TableCell>
                    <TableCell  className=" text-center">
                       {user.role?.name}
                    </TableCell>
                    <TableCell  className=" text-center">
                       {user.message_count}
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
                      {index + 1}
                    </TableCell>
                    <TableCell  className="font-medium">
                    <p className="truncate text-center">
                    {formatName(user.first_name, user.middle_name, user.last_name)} 
                        </p>
                    </TableCell>
                    <TableCell className="text-center ">{user.email}</TableCell>
                    <TableCell  className=" text-center">
                       {user.role?.name}
                    </TableCell>
                    <TableCell  className=" text-center">
                       {user.message_count}
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
        url={AppRouter.staffMessage}
        remainingUrl="&search=&duration&type="
      />
      }
        </div>
    );
}