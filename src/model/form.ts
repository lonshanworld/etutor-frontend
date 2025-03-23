import { UserRole } from "./user";

export type FormData = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  address?: string;
  nationality: string;
  gender: string;
  dob: string;
  passportNo?: string | null;
  phoneNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};
