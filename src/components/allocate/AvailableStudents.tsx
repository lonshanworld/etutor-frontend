"use clients";

import { useEffect, useRef, useState } from "react";
import AllocationTable from "../table/allocation/AllocationTable";
import { twMerge } from "tailwind-merge";
import { getStudents } from "@/api/services/students";
import { User, userFromJson } from "@/model/user";
import { useMajor } from "@/stores/useMajor";
import { allocateStudent } from "@/api/services/allocate";
import { useAllocate } from "@/stores/useAllocate";
import { useToast } from "@/stores/useToast";
import NoAssignedStudents from "@/assets/images/no-assigned-students.png";

const AvailableStudents = ({
  setActiveTab,
  searchData,
}: {
  setActiveTab: (value: number) => void;
  searchData?: string;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  const { majors } = useMajor();
  const { activeUser } = useAllocate();
  const { showToast } = useToast();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchCleared, setSearchCleared] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      console.log("search...", searchData);
      if (searchData) {
        const response = await getStudents(1, searchData);
        const studentResponse = response?.data.map(userFromJson);
        console.log("search students", studentResponse);
        const newStudentData: any[] = [];

        studentResponse.forEach((student: any) => {
          if (student.tutorSessionStatus === "Unassigned") {
            console.log("sssssssssssss", student);
            newStudentData.push({
              id: student.info.id,
              name:
                student.firstName +
                " " +
                (student.middleName !== null ? student.middleName : "") +
                " " +
                student.lastName,
              email: student.email,
              major: getMajorName(student.info.major_id),
            });
          }
        });
        console.log("new...", newStudentData);
        setFilteredData(newStudentData);
        setHasMore(false);
        //   setFilteredData(searchList);
      } else {
        setSearchCleared(true);
      }
    };

    handleSearch();
  }, [searchData]);

  useEffect(() => {
    if (searchCleared) {
      setPage(1);
      setStudents([]);
      setFilteredData([]);
      setHasMore(true); // Allow loading next pages again
    } else {
      loadStudents(page); // Normal loading when page changes
    }
  }, [page, searchCleared]);

  useEffect(() => {
    if (searchCleared) {
      loadStudents(1);
      setSearchCleared(false);
    }
  }, [searchCleared]);

  const getMajorName = (id: number) => {
    if (id) {
      const selectedMajor = majors.filter((major) => major.id === id);
      return selectedMajor ? selectedMajor[0].name : "-";
    }
    return "-";
  };

  const loadStudents = async (page: number) => {
    try {
      setLoading(true);
      const response = await getStudents(page, "");
      const studentResponse = response?.data.map(userFromJson);

      const newStudentData: any[] = [];

      studentResponse.forEach((student: any) => {
        if (student.tutorSessionStatus === "Unassigned") {
          newStudentData.push({
            id: student.info.id,
            name:
              student.firstName +
              " " +
              (student.middleName !== null ? student.middleName : "") +
              " " +
              student.lastName,
            email: student.email,
            major: getMajorName(student.info.major_id),
          });
        }
      });
      if (newStudentData.length === 0 && page < response.meta.last_page) {
        // Automatically load the next page if no "Unassigned" students found
        loadStudents(page + 1);
        return;
      }

      // Combine old and new, then remove duplicates by ID
      setStudents((prev) => {
        const combined = [...prev, ...newStudentData];
        const unique = Array.from(
          new Map(combined.map((s) => [s.id, s])).values()
        );
        return unique;
      });
      setFilteredData((prev) => {
        const combined = [...prev, ...newStudentData];
        const unique = Array.from(
          new Map(combined.map((s) => [s.id, s])).values()
        );
        return unique;
      });

      if (response.meta.current_page >= response.meta.last_page) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }
  }, [loading, hasMore]);

  const allocate = async () => {
    try {
      const response = await allocateStudent({
        student_id: selectedUsers,
        tutor_id: activeUser?.info.id,
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
      console.error("Failed to assign:", error);
      showToast(error.errorText, "error");
    }
  };

  const columns = ["Name", "Email", "Major"];
  return (
    <div>
      <div className="flex justify-end">
        <button
          className={twMerge(
            "px-8 py-2 text-white rounded-md",
            selectedUsers.length > 0
              ? "bg-theme"
              : "bg-gray-400  cursor-not-allowed"
          )}
          disabled={selectedUsers.length > 0 ? false : true}
          onClick={allocate}
        >
          Assign
        </button>
      </div>

      <div className="mt-5">
        {students.length > 0 ? (
          <AllocationTable
            activePopup="tutor"
            data={filteredData}
            columns={columns}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            loading={loading}
            bottomRef={bottomRef}
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
            No Unassigned Students
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableStudents;
