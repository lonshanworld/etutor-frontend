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
import WarningPopup from "../warningpopup/WarningPopup";
import { errorStore } from "@/stores/errorStore";
import ErrorPopup from "../ErrorPopup";

const AvailableStudents = ({
  setActiveTab,
  searchData,
  // activeUser,
}: {
  setActiveTab: (value: number) => void;
  searchData?: string;
  // activeUser: User | null;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  const { majors } = useMajor();
  const { activeUser } = useAllocate();
  const { showToast } = useToast();
  const { isError, setError } = errorStore();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchCleared, setSearchCleared] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAllocating, setAllocating] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchData) {
        const response = await getStudents(1, searchData);
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
              profile_picture: student.profile_picture,
            });
          }
        });
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
    if (page === 1) setFirstLoading(true);
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
            profile_picture: student.profileImagePath,
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
    setFirstLoading(false);
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
    setAllocating(true);
    if (activeUser?.student?.length + selectedUsers.length > 10) {
      setShowWarning(true);
      setError(
        `You already have ${activeUser?.student?.length} students assigned. You can only assign ${10 - activeUser?.student?.length} more students.`
      );
    } else {
      try {
        const response = await allocateStudent({
          student_id: selectedUsers,
          tutor_id: activeUser?.info.id,
        });
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
    }
    setAllocating(false);
  };

  const columns = ["Name", "Email", "Major"];
  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={allocate}
          disabled={selectedUsers.length > 0 ? false : true}
          type="button"
          className={twMerge(
            "text-white font-medium px-8 py-2 rounded-md text-center inline-flex items-center",
            selectedUsers.length > 0
              ? "bg-theme"
              : "bg-gray-400  cursor-not-allowed",
            isAllocating && "pointer-events-none"
          )}
        >
          {isAllocating && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin me-2"></div>
          )}
          {isAllocating ? "Assigning" : "Assign"}
        </button>
      </div>

      <div className="relative mt-5">
        {firstLoading && (
          <div className="absolute top-0 left-0 flex justify-center items-center bg-gray-50/80 w-full h-[330px] z-[100]">
            <div className="w-10 h-10 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {students.length > 0 && (
          <AllocationTable
            activePopup="tutor"
            data={filteredData}
            columns={columns}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            loading={loading}
            bottomRef={bottomRef}
          />
        )}
        {!loading && students.length <= 0 && (
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
        {isError && <ErrorPopup />}
        {!firstLoading && loading && (
          <div className="flex justify-center">
            <div className="w-7 h-7 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableStudents;
