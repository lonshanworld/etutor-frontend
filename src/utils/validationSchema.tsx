import { UserRole } from "@/model/user";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter the valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const UserRoleSchema: z.ZodNativeEnum<typeof UserRole> =
  z.nativeEnum(UserRole);

export const CreateFormSchema = z
  .object({
    firstName: z.string().min(2, { message: "First Name is required" }),
    middleName: z.string().nullable(),
    lastName: z.string().min(2, { message: "Last Name is required" }),
    address: z.string().min(2, { message: "Address is required" }),
    nationality: z
      .string()
      .min(2, { message: "Nationality field is required" }),
    gender: z.string().min(1, { message: "Gender is required" }),
    dob: z
      .string()
      .min(1, { message: "Date is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      }),
    passportNo: z.string().nullable(),
    phoneNo: z.string().min(9, { message: "This is not a valid phone number" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
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

export const UpdateFormSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required" }),
  middleName: z.string().nullable(),
  lastName: z.string().min(2, { message: "Last Name is required" }),
  address: z.string().min(2, { message: "Address is required" }),
  nationality: z.string().min(2, { message: "Nationality field is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  dob: z.string().min(1, { message: "DOB is required" }),
  passportNo: z.string().nullable(),
  phoneNo: z.string().min(9, { message: "This is not a valid phone number" }),
  email: z.string().email(),
  role: UserRoleSchema,
});

export type UpdateFormSchemaType = z.infer<typeof UpdateFormSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current Password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." }),
  })
  .refine(
    (data) => {
      return data.newPassword === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;

export const meetingSchema = z
  .object({
    subject: z.string().min(1, "Subject is required"),
    time: z.string().nonempty("Time is required"),
    date: z.string().nonempty("Date is required"),
    location: z.string().nullable(),
    platform: z.string().nullable(),
    meetingType: z.enum(["Virtual", "In-Person"]),
    link: z.string().nonempty("Link is required"),
    students: z
      .array(
        z.object({
          userId: z.number(),
          studentId: z.number(),
          name: z.string(),
          profile_picture: z.string().nullable(),
        })
      )
      .min(1, "At least one student must be assigned"),
  })
  .superRefine((data, ctx) => {
    if (data.meetingType === "Virtual") {
      if (!data.platform || data.platform.trim() === "") {
        ctx.addIssue({
          path: ["platform"],
          message: "Platform is required for Virtual meetings",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!data.link || data.link.trim() === "") {
        ctx.addIssue({
          path: ["link"],
          message: "Link is required for Virtual meetings",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.meetingType === "In-Person") {
      if (!data.location || data.location.trim() === "") {
        ctx.addIssue({
          path: ["location"],
          message: "Location is required for In-Person meetings",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
