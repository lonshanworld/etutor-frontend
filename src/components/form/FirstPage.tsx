import InputField from "../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../buttons/Button";
import { DayPicker } from "../daypicker/DayPicker";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioButton } from "../radioButton/RadioButton";
import { subYears } from "date-fns";
import { useFormState } from "react-dom";
import { useFormStore } from "@/stores/useFormStore";
import { useEffect, useState } from "react";
import { UserRole } from "@/model/user";

type Props = {
  setPageForm: (page: number) => void;
  role: UserRole | null;
};

const FormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is Required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last Name is Required" }),
    address: z.string().optional(),
    nationality: z.string().optional(),
    gender: z.string().min(1, { message: "Gender is required" }),
    dob: z.string().min(1, { message: "DOB is required" }),
    passportNo: z.string().optional(),
    phoneNo: z.string().min(9, { message: "This is not a valid phone number" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(16, { message: "Password must not exceed 16 characters." })
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required." }),
    role: z.number(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
      console.log("confirm", data.confirmPassword);
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type FormSchemaType = z.infer<typeof FormSchema>;

export default function FirstPage({ setPageForm }: Props) {
  const { setFormData, role } = useFormStore();
  console.log("role", role);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data, e: any) => {
    e.preventDefault();
    const { confirmPassword, ...userData } = data;
    console.log(userData);
    setFormData(userData as any);
    setPageForm(2);
  };

  useEffect(() => {
    setValue("role", Number(role));
  }, [role]);
  console.log(typeof role);

  useEffect(() => {});
  console.log("errors", errors);

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid-3">
            <div>
              <InputField
                id="firstName"
                label="First Name"
                type="text"
                register={register("firstName")}
                error={{
                  name: errors.firstName ? "firstName" : null,
                  message: errors?.firstName?.message,
                }}
              />
            </div>
            <div>
              <InputField
                id="middleName"
                label="Middle Name"
                register={register("middleName", { required: false })}
                type="text"
              />
            </div>
            <div>
              <InputField
                id="lastName"
                label="Last Name"
                type="text"
                register={register("lastName")}
                error={{
                  name: errors.lastName ? "lastName" : null,
                  message: errors?.lastName?.message,
                }}
              />
            </div>
          </div>

          <div className="grid-2">
            <InputField
              id="address"
              label="Address"
              register={register("address", { required: false })}
              type="text"
            />
            <InputField
              id="nationality"
              label="Nationality"
              type="text"
              register={register("nationality", { required: false })}
            />
          </div>

          <div className="grid-3">
            <div>
              <RadioButton
                mainLabel="Gender"
                label1="Male"
                label2="Female"
                value1="male"
                value2="female"
                register={register("gender", {
                  required: "Gender is required",
                })}
                watch={watch}
                setValue={setValue}
                error={errors.gender && errors.gender.message}
              />
            </div>
            <div>
              <Label>DOB</Label>
              <DayPicker
                input="dob"
                watch={watch("dob")}
                setValue={setValue}
                register={register("dob", {
                  required: "DOB is required",
                })}
                error={errors.dob && errors.dob.message}
              />
              {errors.dob && (
                <p className="text-red-500">{errors.dob.message}</p>
              )}
            </div>

            <div className="lg:mt-6">
              <InputField
                id="passportNo"
                label="Passport No"
                type="text"
                register={register("passportNo", { required: false })}
              />
            </div>
          </div>

          <div className="grid-2">
            <div>
              <InputField
                type="tel"
                label="Phone No"
                id="phoneNo"
                register={register("phoneNo")}
                error={{
                  name: errors.phoneNo ? "phoneNo" : null,
                  message: errors?.phoneNo?.message,
                }}
              />
            </div>

            <div>
              <InputField
                type="text"
                label="Email"
                id="email"
                register={register("email")}
                error={{
                  name: errors.email ? "email" : null,
                  message: errors?.email?.message,
                }}
              />
            </div>
          </div>

          <div className="grid-2">
            <div>
              <InputField
                type="text"
                label="Password"
                id="password"
                register={register("password")}
                error={{
                  name: errors.password ? "password" : null,
                  message: errors?.password?.message,
                }}
              />
            </div>
            <div>
              <InputField
                type="text"
                label="Confirm Password"
                id="confirmPassword"
                register={register("confirmPassword")}
                error={{
                  name: errors.confirmPassword ? "confirmPassword" : null,
                  message: errors?.confirmPassword?.message,
                }}
              />
            </div>
            {role && (
              <input
                type="hidden"
                id="userRole"
                {...register("role")}
                value={Number(role)}
              />
            )}
          </div>

          <CustomButton text="Next" type="submit" fullWidth={true} />
        </div>
      </form>
    </div>
  );
}
