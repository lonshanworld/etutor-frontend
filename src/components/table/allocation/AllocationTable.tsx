"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaUserCircle } from "react-icons/fa";
import NoResultFound from "../../searchbar/NoResultFound";
import NotAssignedIcon from "@/assets/svgs/error.svg";
import AssignedIcon from "@/assets/svgs/tick.svg";
import CheckBox from "@/assets/svgs/checkbox.svg";
import Selected from "@/assets/images/selected.png";
import { useEffect, useState } from "react";
import { allocateStudent, unassignedStudent } from "@/api/services/allocate";
import { useToast } from "@/stores/useToast";
import { useAllocate } from "@/stores/useAllocate";
import { User } from "@/model/user";
import NoAssignedStudents from "@/assets/images/no-assigned-students.png";
import WarningPopup from "@/components/warningpopup/WarningPopup";

type TableProps = {
  columns: any;
  data: any[];
  selectedUsers: any[];
  setSelectedUsers: any;
  setSelectAll?: (vaule: boolean) => void;
  activePopup: "tutor" | "student";
  activeTab?: number;
  loading?: boolean;
  bottomRef?: any;
};
const AllocationTable = ({
  data,
  columns,
  selectedUsers,
  setSelectedUsers,
  setSelectAll,
  activePopup,
  activeTab,
  loading,
  bottomRef,
}: TableProps) => {
  const { showToast } = useToast();
  const { activeUser } = useAllocate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<number | null>(null);

  const selectUser = (id: any) => {
    setSelectedUsers((prev: any) => {
      const userArray = Array.isArray(id) ? id : [id]; // Ensure `user` is an array

      // Remove users that already exist in the selected list
      const newUsers = userArray.filter(
        (u) => !prev.some((newId: any) => newId === id)
      );

      return newUsers.length > 0 ? [...prev, ...newUsers] : prev; // Only update state if new users exist
    });

    console.log("selected", id);
  };

  const removeUser = (id: any) => {
    const filteredUsers = selectedUsers.filter((eachUser) => eachUser !== id);
    setSelectedUsers(filteredUsers);
  };

  useEffect(() => {
    // console.log("selectedUsers", selectedUsers);
    if (selectedUsers.length !== data.length) {
      setSelectAll && setSelectAll(false);
    }
  }, [selectedUsers]);

  const unassign = async () => {
    setIsLoading(true);
    try {
      const response = await unassignedStudent({
        student_id: [activeUser?.info.id],
      });
      console.log("unassigned", response);
      showToast(response.message, "success");
      if (!response?.errorCode) {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error: any) {
      console.error("Failed to unassign:", error);
      showToast(error.errorText, "error");
    }
    setIsLoading(false);
  };

  const allocate = async (tutor: User) => {
    setSelectedTutor(tutor.id);
    setIsLoading(true);
    try {
      const response = await allocateStudent({
        student_id: [activeUser?.info?.id],
        tutor_id: tutor.id,
      });
      console.log("assigned", response);
      if (response.errorCode === 500) {
        showToast(response.errorText, "error");
      } else {
        showToast(response.message, "success");
      }
      if (!response?.errorCode) {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error: any) {
      console.error("Failed to unassign:", error);
      showToast(error.errorText, "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="relative sm:rounded-t-md border-t-[1px]">
      <div className="relative sm:rounded-t-md border-t-[1px] max-h-[330px] overflow-y-auto custom-scrollbar">
        <div className="overflow-x-auto">
          <Table className="min-w-[700px] border-collapse overflow-auto">
            <TableHeader className="bg-theme py-3 rounded-lg sticky top-0 z-10 border border-theme">
              <TableRow className="">
                <TableHead className="max-sm:text-sm text-left w-[50px] ps-5"></TableHead>

                <TableHead className="max-sm:text-sm text-left">
                  {columns[0]}
                </TableHead>
                <TableHead className="max-sm:text-sm text-left">
                  {columns[1]}
                </TableHead>
                <TableHead className="ps-10 text-left">{columns[2]}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="max-sm:text-[11px] max-h-52 overflow-auto">
              {data.length > 0 ? (
                data.map((user, index) => (
                  <TableRow
                    key={index}
                    className="border-[1px] border-tableRowBorder h-[70px]"
                  >
                    {activePopup === "tutor" ? (
                      <TableCell className="ps-5">
                        {selectedUsers.some(
                          (selectedUser) => selectedUser === user.id
                        ) ? (
                          <img
                            src={Selected.src}
                            alt=""
                            onClick={() => removeUser(user.id)}
                            className="cursor-pointer"
                          />
                        ) : (
                          <img
                            src={CheckBox.src}
                            alt=""
                            onClick={() => selectUser(user.id)}
                            className="cursor-pointer"
                          />
                        )}
                      </TableCell>
                    ) : (
                      <TableCell className="ps-5"></TableCell>
                    )}

                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="sm:w-[30px] sm:h-[30px] w-[15px] h-[15px] rounded-full overflow-hidden flex items-center">
                          {user.profile_picture ? (
                            <img
                              src={user.profile_picture}
                              className="object-cover"
                              alt=""
                            />
                          ) : (
                            <FaUserCircle className="text-lg sm:text-3xl text-theme" />
                          )}
                        </div>
                        <p className="truncate">
                          {user.name ??
                            user.firstName +
                              " " +
                              (user.middleName ? user.middleName : "") +
                              " " +
                              user.lastName}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="ps-10 text-center">
                      <div className="flex justify-left items-center gap-3">
                        {activePopup === "tutor" ? (
                          <div>{user.major}</div>
                        ) : activeTab == 1 ? (
                          isLoading ? (
                            <div className="w-5 h-5 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <div
                              className="text-red-500 cursor-pointer"
                              onClick={unassign}
                            >
                              Unassign
                            </div>
                          )
                        ) : selectedTutor === user.id && isLoading ? (
                          <div className="w-5 h-5 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <div
                            className="text-blue-500 cursor-pointer"
                            onClick={() => allocate(user)}
                          >
                            Assign
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <div className="flex flex-col items-center justify-center mt-20 gap-3">
                      <img
                        src={NoAssignedStudents.src}
                        width={130}
                        height={130}
                        alt=""
                        draggable="false"
                      />
                      No Records Found
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div ref={bottomRef} className="h-1"></div>

        {/* {loading && <p className="text-center">Loading more...</p>} */}
      </div>
    </div>
  );
};

export default AllocationTable;
