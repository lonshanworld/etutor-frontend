"use client";
import { useEffect, useState } from "react";
import AllocationTable from "../table/allocation/AllocationTable";
import CustomButton from "../buttons/Button";
import { twMerge } from "tailwind-merge";
import NoAssignedStudents from "@/assets/images/no-assigned-students.png";
import { User } from "@/model/user";

type TutorProps = {
  id: number;
  name: string;
  email: string;
};

const MyTutor = ({
  activeTab,
  setActiveTab,
  activeUser,
}: {
  activeTab: number;
  setActiveTab: (value: number) => void;
  activeUser: User | null;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [data, setData] = useState<TutorProps[]>([]);

  const columns = ["Name", "Email", "Action"];

  useEffect(() => {
    if (activeUser && activeUser.tutor) {
      setData([
        {
          id: activeUser.tutor.id,
          name: activeUser.tutor.name,
          email: activeUser.tutor.email,
        },
      ]);
    }
  }, []);

  return (
    <div>
      <div className="mt-10">
        {data.length > 0 ? (
          <AllocationTable
            activePopup="student"
            data={data}
            columns={columns}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setSelectAll={setSelectAll}
            activeTab={activeTab}
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
            No assigned Tutor
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutor;
