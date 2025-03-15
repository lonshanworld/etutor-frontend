export const APIS = {
  GET: {
    getStudentList: "students",
    getTutorList: "tutors",
    getStaffList: "staffs",
  },
  POST: {
    login: "auth/login",
    logout: "auth/logout",
    createStudent: "students/account/create",
    createTutor: "tutors/account/create",
    createStaff: "staffs/account/create",
  },
  PATCH: {
    updateUser: "account/update",
  },
  DELETE: {},
};
