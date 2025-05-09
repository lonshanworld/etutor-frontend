import { getUnassignedStudents } from "./services/report";

export const APIS = {
  GET: {
    getStudentList: "students",
    getTutorList: "tutors",
    getStaffList: "staffs",
    getMyProfile: "user/profile", // get own user profile
    getProfile: (id: number) => `user/${id}/profile`, // get user profile by id
    checkEmail: "check-email",
    confirmOtp: "confirm-otp",
    getMajors: "majors",
    getSubjects: "subjects",
    getMajorsWithSubjects: "majors-with-subjects",

    getBlogs: "blogs",
    getBlogById: (blogId: number) => `blogs/${blogId}`,
    getFiles: "blogs/files",

    getReportActiveUsers: "reports/active-users",
    getBrowsersUsage: "reports/browser-usage",
    getPageUsage : 'reports/view-pages',
    getChatProfile: (id: number) => `user/${id}/profile`,
    getUnassignedStudents: "reports/studentsunassigned",
    getChatMessageList: "studentstutors",
    getNoti: "notifications",

    getStudentsTutors: "studentstutors",
    getSessionLogByUserId : (id :number) =>`getSessionLogByUserId?user_id=${id}`,

  },
  POST: {
    login: "auth/login",
    logout: "auth/logout",
    createStudent: "students/account/create",
    createTutor: "tutors/account/create",
    createStaff: "staffs/account/create",
    changePassword: "user/change-password",

    giveLike: "blogs/give-like",
    giveComment: "blogs/give-comment",
    uploadAttachment: "upload-attachment",
    addBlog: "blogs/add",

    unassignStudent: "staffs/unassign-student-tutor",
    allocateStudent: "staffs/allocate-student-tutor",
    deleteBlog: (blogId: number) => `blogs/${blogId}/delete`,
    createMeeting: "meetings/create",

    getActiveMeetings: "meetings",
    getHistoryMeetings: "meetings/recent",

    getMyStudents: "tutors/my-students",
    getMyTutor: "students/my-tutor",

    increasePageCount : (route : string) => `increasePageCount?route=${route}`,
    increaseBrowserCount : (name : string) => `increaseBrowserCount?name=${name}`,

    readNoti: "notifications/mark-read",

    updateProfile: "user/profile-picture/update",

    sendLogout : (id : number) => `event/logout?id=${id}`,
  },
  PATCH: {
    updatePassword: "update-password", // reset password

    createStudent: "students/account/create",
    updateStudent: (id: number) => `students/${id}/account/update`,
    deactivateStudent: "students/account/deactivate",

    createTutor: "tutors/account/create",
    updateTutor: (id: number) => `tutors/${id}/account/update`,
    deactivateTutor: "tutors/account/deactivate",

    createStaff: "staffs/account/create",
    updateStaff: (id: number) => `staffs/${id}/account/update`,
    deactivateStaff: "staffs/account/deactivate",
  },
  DELETE: {
    deleteMeeting: (meetingId: number) => `meetings/${meetingId}`,
  },
};
