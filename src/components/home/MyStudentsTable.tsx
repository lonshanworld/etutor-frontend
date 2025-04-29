import { MyStudent } from "@/model/home";
import { useUserStore } from "@/stores/useUserStore";
import { formatName } from "@/utils/formatData";
import { useMemo, useState } from "react";
import { FaArrowDownAZ, FaArrowDownZA } from "react-icons/fa6";
import ProfileBoxPopup from "../popup/ProfileBoxPopup";
import ProfilePic from "../ProfilePic";

interface Props {
  loading: boolean;
  myStudents: MyStudent[];
}

const MyStudentsTable = ({ loading, myStudents }: Props) => {
  const { user } = useUserStore();
  const [profilePopup, setProfilePopup] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleViewProfile = (userId: number) => {
    setProfilePopup(true);
    setUserId(userId);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    const searchTerm = search.toLowerCase();

    let filtered = myStudents.filter((student) => {
      const fullName = formatName(
        student.first_name,
        student.middle_name,
        student.last_name
      ).toLowerCase();
      return (
        fullName.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
      );
    });

    filtered.sort((a, b) => {
      const nameA = formatName(
        a.first_name,
        a.middle_name,
        a.last_name
      ).toLowerCase();
      const nameB = formatName(
        b.first_name,
        b.middle_name,
        b.last_name
      ).toLowerCase();
      if (sortOrder === "asc") return nameA.localeCompare(nameB);
      return nameB.localeCompare(nameA);
    });

    return filtered;
  }, [search, sortOrder, myStudents]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-primaryText px-2 pb-3 text-lg">
          My Students
        </h2>

        <div className="px-2 pb-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-sm px-3 sm:py-2 py-1.5 border border-inputBorder rounded focus:outline-none focus:ring-2 focus:ring-teal-500 sm:min-w-[250px] bg-transparent"
          />
        </div>
      </div>

      <div className="sm:rounded-t-xl overflow-hidden">
        <div className="h-full w-full overflow-auto">
          <div className="min-w-[700px]">
            {profilePopup && (
              <ProfileBoxPopup
                className="right-40"
                userId={userId || 0}
                onClose={() => setProfilePopup(false)}
              />
            )}
            <table className="w-full table-auto bg-background sm:rounded-t-lg relative">
              <thead className="bg-theme py-3 h-[45px] text-white">
                <tr className="border border-theme">
                  <th className="ps-5 sm:w-[70px] text-left">No</th>
                  <th
                    className="text-left cursor-pointer select-none"
                    onClick={handleSortToggle}
                    title="Sort by name"
                  >
                    <div className=" flex items-center gap-2">
                      <span>Name</span>
                      {sortOrder === "asc" ? (
                        <FaArrowDownAZ />
                      ) : (
                        <FaArrowDownZA />
                      )}
                    </div>
                  </th>
                  <th className="text-left">Email</th>
                  <th className="text-left max-md:hidden">Phone</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center h-[200px]">
                      Loading...
                    </td>
                  </tr>
                ) : myStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center h-[200px]">
                      No student assigned to you yet
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center h-[200px]">
                      No matching students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr
                      key={student.user_id}
                      className="border border-tableRowBorder h-[50px] sm:h-[70px] text-sm"
                    >
                      <td className="ps-5">{index + 1}</td>
                      <td>
                        <div className="flex gap-2 items-center">
                          <ProfilePic
                            profileUrl={student.profile_picture}
                            size={26}
                          />
                          <span>
                            {formatName(
                              student.first_name,
                              student.middle_name,
                              student.last_name
                            )}
                          </span>
                        </div>
                      </td>
                      <td>{student.email}</td>
                      <td className="max-md:hidden">{student.phone_number}</td>
                      <td className="text-center relative">
                        <button
                          onClick={() => handleViewProfile(student.user_id)}
                          className="px-2 py-1.5 text-white bg-theme hover:bg-optionBgHover"
                        >
                          View profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyStudentsTable;
