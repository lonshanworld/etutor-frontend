import { StaffInfo, StudentInfo, TutorInfo } from "./profile";

export type User = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: string;
  email: string;
  phoneNo: string;
  dob: string;
  nationality: string;
  passport: string;
  profileImagePath?: string;
  status: any;
  roleID?: string;
  role?: UserRole | null;
  gender: UserGender;
  info: any;
};

export enum UserRole {
  student = "student",
  tutor = "tutor",
  staff = "staff",
}

export enum UserGender {
  male = "male",
  female = "female",
}

function stringToUserRole(data?: string): UserRole | null {
  switch (data?.toLowerCase()) {
    case "student":
      return UserRole.student;
    case "tutor":
      return UserRole.tutor;
    case "admin":
      return UserRole.staff;
    case "staff":
      return UserRole.staff;
    default:
      return null;
  }
}

export function userFromJson(jsonData: any): User {
  const data: User = {
    id: jsonData.id,
    firstName: jsonData.first_name,
    middleName: jsonData.middle_name,
    lastName: jsonData.last_name,
    address: jsonData.address,
    email: jsonData.email,
    phoneNo: jsonData.phone_number,
    dob: jsonData.date_of_birth,
    nationality: jsonData.nationality,
    passport: jsonData.passport,
    profileImagePath: jsonData.profile_picture,
    roleID: jsonData.role.id,
    role: stringToUserRole(jsonData.role.name),
    status: jsonData.status,
    gender: jsonData.gender,
    info:
      jsonData.admin ||
      jsonData.staff ||
      jsonData.student ||
      jsonData.tutor ||
      null,
  };

  return data;
}
