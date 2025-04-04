
export const APIS = {
  GET: {
    getStudentList: "students",
    getTutorList: "tutors",
    getStaffList: "staffs",
    getMyProfile: "user/profile", // get own user profile
    getProfile: (id: string) => `user/${id}/profile`, // get user profile by id
    checkEmail: "check-email",
    confirmOtp: "confirm-otp",
    getMajors: "majors",
    getSubjects: "subjects",
    getMajorsWithSubjects: "majors-with-subjects",
    getBlogs: "blogs",
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
  DELETE: {},
};
