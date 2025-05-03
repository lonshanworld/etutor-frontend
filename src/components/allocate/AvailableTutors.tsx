"use client";
import { useEffect, useRef, useState } from "react";
import AllocationTable from "../table/allocation/AllocationTable";
import CustomButton from "../buttons/Button";
import { twMerge } from "tailwind-merge";
import NoAssignedStudents from "@/assets/images/no-assigned-students.png";
import { User, userFromJson } from "@/model/user";
import { getTutors } from "@/api/services/tutors";

const AvailableTutors = ({
  setActiveTab,
  searchData,
}: {
  setActiveTab: (value: number) => void;
  searchData: string;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [tutors, setTutors] = useState<User[]>([]);

  const columns = ["Name", "Email", "Action"];

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [searchCleared, setSearchCleared] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchData) {
        const response = await getTutors(1, searchData);
        const tutorResponse = response?.data.map(userFromJson);
        const newTutorData: any[] = [];

        tutorResponse.forEach((tutor: any) => {
          if (tutor.studentCount < 10) {
            newTutorData.push({
              id: tutor.info.id,
              name:
                tutor.firstName +
                " " +
                (tutor.middleName !== null ? tutor.middleName : "") +
                " " +
                tutor.lastName,
              email: tutor.email,
              profile_picture: tutor.profileImagePath,
            });
          }
        });
        setFilteredData(newTutorData);
        setHasMore(false);
      } else {
        setSearchCleared(true);
      }
    };

    handleSearch();
  }, [searchData]);

  useEffect(() => {
    if (searchCleared) {
      loadTutors(1); // Force reload when search is cleared
      setSearchCleared(false); // Reset the flag after loading
    } else {
      loadTutors(page); // Normal loading when page changes
    }
  }, [page, searchCleared]);

  const loadTutors = async (page: number) => {
    try {
      setLoading(true);
      const response = await getTutors(page, "");
      const tutorResponse = response?.data.map(userFromJson);
      const newTutorData: any[] = [];

      tutorResponse.forEach((tutor: any) => {
        if (tutor.studentCount < 10) {
          newTutorData.push({
            id: tutor.info.id,
            name:
              tutor.firstName +
              " " +
              (tutor.middleName !== null ? tutor.middleName : "") +
              " " +
              tutor.lastName,
            email: tutor.email,
            profile_picture: tutor.profileImagePath,
          });
        }
      });

      // Combine old and new, then remove duplicates by ID
      setTutors((prev) => {
        const combined = [...prev, ...newTutorData];
        const unique = Array.from(
          new Map(combined.map((s) => [s.id, s])).values()
        );
        return unique;
      });

      setFilteredData((prev) => {
        const combined = [...prev, ...newTutorData];
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
      console.error("Failed to fetch tutors:", error);
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

  return (
    <div>
      <div className="mt-10 relative">
        {loading && (
          <div className="absolute top-0 left-0 flex justify-center items-center bg-gray-50/80 w-full h-[330px] z-[100]">
            <div className="w-10 h-10 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {tutors.length > 0 && (
          <AllocationTable
            activePopup="student"
            data={filteredData}
            columns={columns}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            setSelectAll={setSelectAll}
            loading={loading}
            bottomRef={bottomRef}
          />
        )}
        {!loading && tutors.length <= 0 && (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src={NoAssignedStudents.src}
              width={243}
              height={251}
              alt=""
              draggable="false"
            />
            No Available Tutor
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableTutors;
