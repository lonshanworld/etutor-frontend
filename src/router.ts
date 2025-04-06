import { unauthorized } from "next/navigation";

export const AppRouter = {
  loginPage: "/login",
  introPage: "/",
  unauthorized: "/unauthorized",

  forgetPassword: "/forget-password",
  confirmOtp: "/confirm-otp",
  resetPassword: "/reset-password",

  staffDashboard: "/dashboard/staff",
  staffStudents: "/dashboard/staff/students",
  staffTutors: "/dashboard/staff/tutors",
  staffStaff: "/dashboard/staff/staffs",
  staffAllocate: "/dashboard/staff/allocate",
  staffActiveUsers: "/dashboard/staff/active-users",
  staffBrowsers : "/dashboard/staff/viewed-browsers",
  staffPages : "/dashboard/staff/viewed-pages",

  studentDashboard: "/dashboard/student",
  studentChat: "/dashboard/student/chat",
  studentBoard: "/dashboard/student/board",
  studentMeeting: "/dashboard/student/meeting",
  studentNote: "/dashboard/student/note",
  studentPeople: "/dashboard/student/people",
  studentChatBox : "/dashboard/student/chat/chatbox",

  tutorDashboard: "/dashboard/tutor",
  tutorChat: "/dashboard/tutor/chat",
  tutorBoard: "/dashboard/tutor/board",
  tutorMeeting: "/dashboard/tutor/meeting",
  tutorNote: "/dashboard/tutor/note",
  tutorPeople: "/dashboard/tutor/people",
  tutorAllocatedStudents: "/dashboard/tutor/allocatedstudent",
  tutorChatBox : "/dashboard/tutor/chat/chatbox",
};
