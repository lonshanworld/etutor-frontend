export const APIS = {
  GET: {
    getStudentList: "students",
    getTutorList: "tutors",
    getStaffList: "staffs",
    getMyProfile: "user/profile", // get own user profile
    getProfile: (id: string) => `user/${id}/profile`, // get user profile by id
    checkEmail: "check-email",
    confirmOtp: "confirm-otp",
  },
  POST: {
    login: "auth/login",
    logout: "auth/logout",
    updatePassword: "update-password", // reset password

    createStudent: "students/account/create",
    updateStudent: (id: string) => `students/${id}/account/update`,
    deactivateStudent: "students/account/deactivate",
  },
  PATCH: {},
  DELETE: {},
};
