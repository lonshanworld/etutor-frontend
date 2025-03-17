import { unauthorized } from "next/navigation";

export const AppRouter = {
  loginPage: "/login",
  introPage: "/",
  unauthorized: "/unauthorized",

  forgetPassword: "/forget-password",
  confirmOtp: "/confirm-otp",
  resetPassword: "/reset-password",

  staffDashboard: "/dashboard/staff",
  staffDashboardStudents: "/dashboard/staff/students",
  staffDashboardTutors: "/dashboard/staff/tutors",
  staffDashboardStaff: "/dashboard/staff/staffs",
  staffDashboardAllocate: "/dashboard/staff/allocate",

  studentDashboard: "/dashboard/student",
  studentChat: "/dashboard/student/chat",
  studentBoard: "/dashboard/student/board",
  studentMeeting: "/dashboard/student/meeting",
  studentNote: "/dashboard/student/note",
  studentPeople: "/dashboard/student/people",

  tutorDashboard: "/dashboard/tutor",
  tutorChat: "/dashboard/tutor/chat",
  tutorBoard: "/dashboard/tutor/board",
  tutorMeeting: "/dashboard/tutor/meeting",
  tutorNote: "/dashboard/tutor/note",
  tutorPeople: "/dashboard/tutor/people",
  tutorAllocatedStudents: "/dashboard/tutor/allocatedstudent",
};
