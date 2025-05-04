"use client";
import { use, useEffect, useState } from "react";
import AllocationTable from "../table/allocation/AllocationTable";
import CustomButton from "../buttons/Button";
import { twMerge } from "tailwind-merge";
import NoAssignedStudents from "@/assets/images/no-assigned-students.png";
import { User } from "@/model/user";
import { unassignedStudent } from "@/api/services/allocate";
import { useToast } from "@/stores/useToast";
import { getTutors } from "@/api/services/tutors";
import { useRouter } from "next/navigation";

type StudentProps = {
  id: number;
  name: string;
  email: string;
  major: string;
};

const AssignedStudents = ({
  setActiveTab,
  activeUser,
  setTutorData,
  searchData,
}: {
  setActiveTab: (value: number) => void;
  activeUser: User | null;
  setTutorData: any;
  searchData: string;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState<StudentProps[]>([]);
  const [filteredData, setFilteredData] = useState<StudentProps[]>([]);
  const [isUnassiging, setIsUnassigning] = useState(false);

  const router = useRouter();

  const { showToast } = useToast();
  const columns = ["Name", "Email", "Major"];

  useEffect(() => {
    const totalStudents: any[] = [];
    console.log("active users", activeUser);
    activeUser?.student.map((user: any) => {
      totalStudents.push({
        id: user.student.id,
        name: user.student.name,
        email: user.student.email,
        major: user.student.major.name,
        profile_picture: user.student.profile_picture,
      });
    });
    setData(totalStudents);
  }, []);

  useEffect(() => {
    if (searchData) {
      const searchList = data.filter((each) =>
        each.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredData(searchList);
    } else {
      // Reset to original data when searchData is empty
      setFilteredData(data);
    }
  }, [searchData, data]);

  const handleSelectAll = () => {
    if (!selectAll) {
      const userList = data.map((user) => user.id);
      setSelectedUsers(userList);
    } else {
      setSelectedUsers([]);
    }
    setSelectAll(!selectAll);
  };

  const unassign = async () => {
    setIsUnassigning(true);
    console.log("assigning...", selectedUsers);
    try {
      const response = await unassignedStudent({ student_id: selectedUsers });
      console.log("res", response);
      showToast(response.message, "success");
      if (!response.errorCode) {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error: any) {
      showToast(error.errorText, "error");
    }
    setIsUnassigning(false);
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="flex justify-between flex-wrap gap-3">
          <button
            className="sm:px-8 px-5 py-2 max-sm:text-sm bg-theme text-white rounded-md"
            onClick={handleSelectAll}
          >
            {selectAll ? "Unselect All" : "Select All"}
          </button>
          {/* <button
            className={twMerge(
              "sm:px-8 px-5 py-2 max-sm:text-sm text-white rounded-md",
              selectedUsers.length > 0
                ? "bg-unassign"
                : "bg-gray-400  cursor-not-allowed"
            )}
            disabled={selectedUsers.length > 0 ? false : true}
            onClick={unassign}
          >
            Unassign
          </button> */}
          <button
            onClick={unassign}
            disabled={selectedUsers.length > 0 ? false : true}
            type="button"
            className={twMerge(
              "text-white font-medium px-8 py-2 rounded-md text-center inline-flex items-center",
              selectedUsers.length > 0
                ? "bg-unassign"
                : "bg-gray-400  cursor-not-allowed",
              isUnassiging && "pointer-events-none"
            )}
          >
            {isUnassiging && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin me-2"></div>
            )}
            {isUnassiging ? "Unassigning" : "Unassign"}
          </button>
        </div>
      )}

      <div className="mt-5">
        {data.length > 0 ? (
          <AllocationTable
            activePopup="tutor"
            data={filteredData}
            columns={columns}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setSelectAll={setSelectAll}
          />
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src={NoAssignedStudents.src}
              width={243}
              height={251}
              alt=""
              draggable="false"
            />
            No assigned students
          </div>
        )}
      </div>

      <div className="absolute bottom-5 right-5 mt-5">
        <button
          className="px-8 py-3 bg-theme text-lg font-bold text-white rounded-md"
          onClick={() => setActiveTab(2)}
        >
          Allocate
        </button>
      </div>
    </div>
  );
};

export default AssignedStudents;
