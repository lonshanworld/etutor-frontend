"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOptionBoxStore } from "@/stores/useOptionBoxStore";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { PaginationDemo } from "../pagination/Pagination";
import { useSearchStore } from "@/stores/useSearchStore";
import NoResultFound from "../searchbar/NoResultFound";
import { User, UserRole } from "@/model/user";
import WarningPopup from "../warningpopup/WarningPopup";
import CustomToast from "../customtoast/CustomToast";
import { useUserStore } from "@/stores/useUserStore";
import UserProfile from "../userProfile/UserProfile";
import { FaUserCircle } from "react-icons/fa";
import StatusIcon from "../statusicon/StatusIcon";
import UserIcon from "@/assets/svgs/user.svg";
import { twMerge } from "tailwind-merge";
import { useFormStore } from "@/stores/useFormStore";
import { useSelectedUser } from "@/stores/useSelectedUser";
import { AppRouter } from "@/router";
import { useToast } from "@/stores/useToast";
import { Profile } from "@/model/profile";
import { deactivateStudent } from "@/api/services/students";
import { deactivateTutor } from "@/api/services/tutors";
import { deactivateStaff } from "@/api/services/staffs";

export default function TableDemo({
  users,
  pageCount,
  currentPage,
  role,
}: {
  users: User[];
  pageCount: number;
  currentPage: number;
  role: UserRole;
}) {
  const { activeRowId, position, setActiveRow, closeOptionBox } =
    useOptionBoxStore();

  const { user: loggedInUser, viewUser } = useUserStore();
  const menuRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [showWarning, setShowWarning] = useState(false);
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const { isSearch, data, setIsSearch, searchData } = useSearchStore();
  const { setShowForm, setRole, setUpdateFormRendered, setUpdateFormModified } =
    useFormStore();

  const [showDetail, setShowDetail] = useState(false);
  const [profileDetailPopup, setProfileDetailPopup] = useState(false);

  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const optionRef = useRef<HTMLDivElement | null>(null);

  const { toast, showToast } = useToast();

  const activeDays = 0;

  useEffect(() => {
    window.addEventListener("resize", () => {
      setActiveRow(null, null);
    });
  }, []);

  useEffect(() => {
    console.log("toast", toast?.message, toast?.type);
  }, [toast]);

  useEffect(() => {
    if (selectedUser) {
      setUserProfile({
        id: selectedUser.id,
        firstName: selectedUser.firstName,
        middleName: selectedUser.middleName,
        lastName: selectedUser.lastName,
        dateOfBirth: selectedUser.dob,
        email: selectedUser.email,
        nationality: selectedUser.nationality,
        gender: selectedUser.gender,
        address: selectedUser.address,
        phoneNumber: selectedUser.phoneNo,
        profileImagePath: selectedUser.profileImagePath,
        passport: selectedUser.passport,
        status: selectedUser.status,
        roleID: selectedUser.roleID,
        role: selectedUser.role ?? undefined,
        info: selectedUser.info,
      });
    }
  }, [selectedUser]);

  const getSelectedUser = (id: number) => {
    const currentUser = users.filter((user) => user.id === id);
    setSelectedUser(currentUser[0]);
  };

  const showUserDetail = (id: number) => {
    loggedInUser?.id === id ? setProfileDetailPopup(true) : setShowDetail(true);
    getSelectedUser(id);
  };

  const handleMenuClick = (id: number) => {
    const button = menuRefs.current[id];
    if (button) {
      const rect = button.getBoundingClientRect();
      setActiveRow(id, {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
      getSelectedUser(id);
    }
  };

  const showWarningPopup = () => {
    if (activeRowId) getSelectedUser(activeRowId);
    setShowWarning(true);
  };

  const showEditForm = (id: number) => {
    getSelectedUser(id);
    setShowForm();
    setRole(role);
    setUpdateFormRendered(true);
    setUpdateFormModified(false);
    setActiveRow(null, null);
  };

  const getUrl = () => {
    if (viewUser) {
      if (viewUser.role === UserRole.student) {
        return AppRouter.studentPeople;
      } else if (viewUser.role === UserRole.tutor) {
        return AppRouter.tutorPeople;
      }
    } else if (loggedInUser && loggedInUser.role === UserRole.staff) {
      switch (role) {
        case UserRole.student:
          return AppRouter.staffStudents;
        case UserRole.tutor:
          return AppRouter.staffTutors;
        case UserRole.staff:
          return AppRouter.staffStaff;
      }
    } else if (loggedInUser?.role === UserRole.student) {
      return AppRouter.studentPeople;
    } else if (loggedInUser?.role === UserRole.tutor) {
      return AppRouter.tutorPeople;
    }
  };

  const handleDeactivate = async () => {
    try {
      let response: any;
      if (selectedUser?.role === UserRole.student) {
        response = await deactivateStudent({ user_id: selectedUser.id });
      } else if (selectedUser?.role === UserRole.tutor) {
        response = await deactivateTutor({ user_id: selectedUser.id });
      } else if (selectedUser?.role === UserRole.staff) {
        response = await deactivateStaff({ user_id: selectedUser.id });
      }
      if (response.message === "success") {
        showToast("User Deactivated Successfully", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
        setShowWarning(false);
        setActiveRow(null, null);
      } else {
        showToast("User Deactivation Failed", "error");
      }
    } catch (error) {
      showToast("Error occurred while deactivating the user", "error");
    }
  };

  return (
    <div className="sm:rounded-t-xl overflow-hidden">
      <Table className="border-collapse w-full bg-background sm:rounded-t-lg !overflow-hidden">
        <TableHeader className="bg-theme py-3 rounded-lg ">
          <TableRow className="">
            <TableHead className="max-sm:text-sm w-[70px] ps-5 lg:w-[100px] lg:ps-8 sm:rounded-tl-md text-left">
              No
            </TableHead>
            <TableHead className="max-sm:text-sm text-left">Name</TableHead>
            <TableHead className="max-sm:text-sm text-left">Email</TableHead>
            <TableHead className="max-sm:hidden ps-10 text-left">
              Activity Status
            </TableHead>
            <TableHead className="max-md:hidden">View</TableHead>
            {loggedInUser?.role === UserRole.staff && (
              <TableHead className="max-sm:text-sm sm:rounded-tr-md">
                Action
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="max-sm:text-[11px]">
          {users.length > 0 ? (
            users.map((user, index) => (
              <TableRow
                key={index}
                className="border-[1px] border-tableRowBorder h-[70px]"
              >
                <TableCell className="font-medium ps-5 lg:ps-8">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="sm:w-[30px] sm:h-[30px] w-[15px] h-[15px] object-cover flex items-center">
                      {user.profileImagePath ? (
                        <img src={user.profileImagePath} className="" alt="" />
                      ) : (
                        <FaUserCircle className="text-lg sm:text-3xl text-theme" />
                      )}
                    </div>
                    <p className="truncate">
                      {user.firstName +
                        " " +
                        (user.middleName ?? "") +
                        " " +
                        user.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="ps-10 text-center max-sm:hidden">
                  <div className="flex justify-left items-center gap-3">
                    <StatusIcon status={user.status} activeDays={activeDays} />
                    <div>{user.status}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center max-md:hidden">
                  <button
                    className="bg-theme p-2 px-4 text-white rounded-md"
                    onClick={() => showUserDetail(user.id)}
                  >
                    View Profile
                  </button>
                </TableCell>
                {loggedInUser?.role === UserRole.staff && (
                  <TableCell className="flex justify-center items-center mt-1 h-[70px]">
                    <button
                      ref={(el) => {
                        if (menuRefs) menuRefs.current[user.id] = el;
                      }}
                      onClick={() => handleMenuClick(user.id)}
                      className="p-2 rounded-md hover:bg-
                    optionBgHover"
                    >
                      <BsThreeDots />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-[450px]">
                <NoResultFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {toast && <CustomToast message={toast.message} type={toast.type} />}

      {/* Option Box (Dropdown Menu) */}
      {activeRowId && position && (
        <div
          className="absolute bg-optionBackground text-optionFontColor shadow-md w-[150px] z-10 max-sm:text-sm"
          ref={optionRef}
          style={{ top: position.top, left: position.left - 120 }}
        >
          <ul>
            <li
              className="p-2 hover:bg-optionBgHover cursor-pointer flex items-center gap-2 md:hidden"
              onClick={() => showUserDetail(activeRowId)}
            >
              <img src={UserIcon.src} className="w-5 h-5" alt="" />
              View Profile
            </li>
            <li
              className="p-2 hover:bg-optionBgHover cursor-pointer flex items-center gap-2"
              onClick={() => showEditForm(activeRowId)}
            >
              <FiEdit className="text-xl text-theme" />
              <span>Edit</span>
            </li>
            <li
              className="p-2 hover:bg-optionBgHover cursor-pointer flex items-center gap-2"
              onClick={showWarningPopup}
            >
              <IoMdCloseCircleOutline className="text-xl text-red-500" />
              <span>Deactivate</span>
            </li>
          </ul>
        </div>
      )}

      {/* Click Outside to Close */}
      {activeRowId && (
        <div className="fixed inset-0 z-0" onClick={closeOptionBox}></div>
      )}

      {/* warning box */}
      {showWarning && (
        <div>
          <WarningPopup
            title="Confirm Deactivation"
            message={`Are you sure you want to deactivate 
            ${selectedUser?.firstName} ${selectedUser?.middleName} ${selectedUser?.lastName} account? This action
            may effect related functionalities.`}
            setShowWarning={setShowWarning}
            onContinue={handleDeactivate}
          />
        </div>
      )}

      {/* popup background */}
      {showWarning && (
        <div
          className="fixed bg-black/70 z-10 top-0 left-0 w-svw h-svh"
          onClick={() => {
            setShowWarning(false);
          }}
        ></div>
      )}

      {/* user profile detail */}
      {showDetail && (
        <UserProfile
          profileData={userProfile}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
        />
      )}

      {profileDetailPopup && (
        <UserProfile
          profileData={userProfile}
          setProfileDetailPopup={setProfileDetailPopup}
        />
      )}

      <div className="flex justify-end mt-3">
        {isSearch && data && (
          <PaginationDemo
            pageCount={pageCount}
            currentPage={currentPage}
            url={getUrl() ?? AppRouter.loginPage}
          />
        )}
        {!isSearch && (
          <PaginationDemo
            pageCount={pageCount}
            currentPage={currentPage}
            url={getUrl() ?? AppRouter.loginPage}
          />
        )}
      </div>
    </div>
  );
}
