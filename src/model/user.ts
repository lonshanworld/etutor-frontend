export type User = {
  id: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phoneNo: string;
  profileImagePath?: string;
  activityStatus: any;
  role?: UserRole | null;
};

export enum UserRole {
  "student",
  "tutor",
  "staff",
}

// export type UserRole = "student" | "tutor" | "staff";

function stringToUserRole(data?: string): UserRole | null {
  switch (data?.toLowerCase()) {
    case "student":
      return UserRole.student;
    case "tutor":
      return UserRole.tutor;
    case "staff":
      return UserRole.staff;
    default:
      return null;
  }
}

export function userFromJson(jsonData: any): User {
  const data: User = {
    id: jsonData.id,
    firstName: jsonData.firstName,
    middleName: jsonData.middleName,
    lastName: jsonData.lastName,
    email: jsonData.email,
    phoneNo: jsonData.phone,
    profileImagePath: jsonData.profileImagePath,
    role: stringToUserRole(jsonData.role),
    activityStatus: jsonData.activityStatus,
  };

  return data;
}
