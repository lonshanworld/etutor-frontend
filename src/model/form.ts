import { z } from "zod";
import { UserRole } from "./user";

export type FormData = {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  address?: string | null;
  nationality: string | null;
  gender: string;
  dob: string;
  passportNo?: string | null;
  phoneNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export const UserRoleSchema: z.ZodNativeEnum<typeof UserRole> =
  z.nativeEnum(UserRole);

export const CreateFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    middleName: z.string().nullable(),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    address: z.string().nullable(),
    nationality: z
      .string()
      .min(2, { message: "Nationality field is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    dob: z.string().min(1, { message: "DOB is required" }),
    passportNo: z.string().nullable(),
    phoneNo: z.string().min(9, { message: "This is not a valid phone number" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." }),
    role: UserRoleSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type CreateFormSchemaType = z.infer<typeof CreateFormSchema>;

export const UpdateFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    middleName: z.string().nullable(),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    address: z.string().nullable(),
    nationality: z
      .string()
      .min(2, { message: "Nationality field is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    dob: z.string().min(1, { message: "DOB is required" }),
    passportNo: z.string().nullable(),
    phoneNo: z.string().min(9, { message: "This is not a valid phone number" }),
    email: z.string().email(),
    password: z.string().nullable(),
    confirmPassword: z.string().nullable(),
    role: z.number(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type UpdateFormSchemaType = z.infer<typeof UpdateFormSchema>;
