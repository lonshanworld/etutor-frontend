export type User = {
  id: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  nationality?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  passport?: string;
  status?: string;
  activityStatus: any;
  roleID?: string;
  role?: string;
};

export enum UserRole {
  "student",
  "tutor",
  "staff",
  "admin",
}

function stringToUserRole(data?: string): UserRole | null {
  switch (data?.toLowerCase()) {
    case "student":
      return UserRole.student;
    case "tutor":
      return UserRole.tutor;
    case "staff":
      return UserRole.staff;
    case "admin":
      return UserRole.admin;
    default:
      return null;
  }
}

export function userFromJson(jsonData: any): User {
  const data = jsonData.data;

  const user: User = {
    id: data.id,
    firstName: data.first_name,
    middleName: data.middle_name,
    lastName: data.last_name,
    email: data.email,
    nationality: data.nationality,
    gender: data.gender,
    address: data.address,
    phoneNumber: data.phone_number,
    passport: data.passport,
    status: data.status,
    activityStatus: data.activity_status,
    roleID: data.role?.id,
    role: data.role?.name,
  };

  return user;
}
