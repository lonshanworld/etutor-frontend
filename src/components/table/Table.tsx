"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import Link from "next/link";
import { useSearchStore } from "@/stores/useSearchStore";
import NoResultFound from "../searchbar/NoResultFound";
import { User, UserRole } from "@/model/user";
import WarningPopup from "../warningpopup/WarningPopup";
import CustomToast from "../customtoast/CustomToast";
import { useUserStore } from "@/stores/userStore";
import UserDetail from "../userDetail/UserDetail";
import { FaUserCircle } from "react-icons/fa";
import StatusIcon from "../statusicon/StatusIcon";
import UserIcon from "@/assets/svgs/user.svg";
import { twMerge } from "tailwind-merge";

export default function TableDemo({ users }: { users: User[] }) {
  const { activeRowId, position, setActiveRow, closeOptionBox } =
    useOptionBoxStore();

  const { showDetail, setShowDetail } = useUserStore();
  const menuRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [showWarning, setShowWarning] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isSearch, data, setIsSearch, searchData } = useSearchStore();

  const [showToast, setShowToast] = useState(false);
  const optionRef = useRef<HTMLDivElement | null>(null);

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

  const activeDays = 0;

  const getSelectedUser = (id: number) => {
    const currentUser = users.filter((user) => user.id === id);
    setSelectedUser(currentUser[0]);
  };

  const showWarningPopup = () => {
    if (activeRowId) getSelectedUser(activeRowId);
    setShowWarning(true);
  };

  const showUserDetail = (id: number) => {
    getSelectedUser(id);
    console.log(selectedUser);
    setShowDetail(true);
  };
  useEffect(() => {
    if (data) {
      console.log("data is here", isSearch);
    }
  }, [data, isSearch]);

  useEffect(() => {
    const handleResize = () => {
      console.log("resize");
      if (optionRef.current?.style.display) {
        console.log(optionRef.current);
        optionRef.current.style.display = "none";
      }
    };
    window.addEventListener("resize", handleResize);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return (
    <div className="sm:rounded-t-xl">
      <Table className="border-collapse w-full bg-background">
        <TableHeader className="bg-theme py-3">
          <TableRow className="">
            <TableHead className="max-sm:text-sm w-[70px] ps-5 lg:w-[100px] lg:ps-8 sm:rounded-tl-md text-left">
              No
            </TableHead>
            <TableHead className="max-sm:text-sm text-left">Name</TableHead>
            <TableHead className="max-sm:text-sm text-left">Email</TableHead>
            <TableHead className="max-sm:hidden ps-10 text-left">
              Activity Status
            </TableHead>
            <TableHead className="max-sm:hidden">View</TableHead>
            <TableHead className="max-sm:text-sm sm:rounded-tr-md">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-sm:text-[11px]">
          {isSearch &&
            (data ? (
              <TableRow>{data.name}</TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-[450px]">
                  <NoResultFound />
                </TableCell>
              </TableRow>
            ))}
          {!isSearch &&
            users.map((user, index) => (
              <TableRow
                key={index}
                className="border-[1px] border-tableRowBorder h-[70px]"
              >
                <TableCell className="font-medium ps-5 lg:ps-8">
                  {user.id}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {user.profileImagePath ? (
                      <img
                        src={user.profileImagePath}
                        className="w-[30px] h-[30px]"
                        alt=""
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-theme" />
                    )}
                    <p className="">
                      {user.firstName +
                        " " +
                        user.middleName +
                        " " +
                        user.lastName}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {user.email}asdfasdfasdfasdfasdfsadfasdfsfafasdf
                  asdfasdfasdfsadfasfd
                  dsfasdfasdfasdfooooooooooooooooooooooooooooooooo
                  ppppppppppppppppp
                </TableCell>
                <TableCell className="ps-10 text-center max-sm:hidden">
                  <div className="flex justify-left items-center gap-3">
                    <StatusIcon activeDays={activeDays} />
                    <div>{user.role} active</div>
                  </div>
                </TableCell>
                <TableCell className="text-center max-sm:hidden">
                  {/* <Link href={`/dashboard/staff/students/${user.id}`}> */}
                  <button
                    className="bg-theme p-2 px-4 text-white rounded-md"
                    onClick={() => showUserDetail(user.id)}
                  >
                    View Profile
                  </button>
                  {/* </Link> */}
                </TableCell>
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
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {showToast && (
        <CustomToast
          message="The user account is successfully deactivated."
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Option Box (Dropdown Menu) */}
      {activeRowId && position && (
        <div
          className="absolute bg-optionBackground text-optionFontColor shadow-md w-[150px] z-10 max-sm:text-sm"
          ref={optionRef}
          style={{ top: position.top, left: position.left - 120 }}
        >
          <ul>
            <li
              className="p-2 hover:bg-optionBgHover cursor-pointer flex items-center gap-2"
              onClick={() => showUserDetail(activeRowId)}
            >
              <img src={UserIcon.src} className="w-5 h-5" alt="" />
              View Profile
            </li>
            <li
              className={twMerge(
                "p-2 hover:bg-optionBgHover cursor-pointer flex items-center gap-2",
                selectedUser?.role === 2 ? "hidden" : ""
              )}
              onClick={() => console.log("edit")}
            >
              <FiEdit className="text-xl" />
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
            username={`${selectedUser?.firstName} ${selectedUser?.middleName} ${selectedUser?.lastName}`}
            setShowWarning={setShowWarning}
            setShowToast={setShowToast}
          />
        </div>
      )}

      {/* popup background */}
      {(showWarning || showDetail) && (
        <div
          className="fixed bg-black/70 z-10 top-0 left-0 w-screen h-screen"
          onClick={() => {
            setShowWarning(false);
            setShowDetail(false);
          }}
        ></div>
      )}

      {/* user profile detail */}
      {showDetail && (
        <UserDetail user={selectedUser} setShowDetail={setShowDetail} />
      )}

      <div className="flex justify-end mt-3">
        {isSearch && data && <PaginationDemo />}
        {!isSearch && <PaginationDemo />}
      </div>
    </div>
  );
}
