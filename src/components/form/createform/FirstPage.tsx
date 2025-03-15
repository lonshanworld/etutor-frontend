import InputField from "../../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../../buttons/Button";
import { DayPicker } from "../../daypicker/DayPicker";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioButton } from "../../radioButton/RadioButton";
import { useFormStore } from "@/stores/useFormStore";
import { useEffect, useState } from "react";
import { User, UserRole } from "@/model/user";
import { UserRoleSchema } from "@/model/form";
import { CreateFormSchema, CreateFormSchemaType } from "@/model/form";

type Props = {
  setPageForm: (page: number) => void;
  role: UserRole | null;
};

export default function FirstPage({ setPageForm }: Props) {
  const { setFormData, role } = useFormStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<CreateFormSchemaType>({
    resolver: zodResolver(CreateFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<any> = (data, e: any) => {
    e.preventDefault();
    console.log(data);
    setFormData(data);
    console.log(data);
    setPageForm(2);
  };

  useEffect(() => {
    clearErrors();
  }, []);

  useEffect(() => {
    setValue("role", UserRoleSchema.parse(role));
  }, [role, setValue]);

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);
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
                register={register("lastName") ?? ""}
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
              error={{
                name: errors.nationality ? "nationality" : null,
                message: errors?.nationality?.message,
              }}
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
                watch={watch}
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
            <input type="hidden" id="userRole" {...register("role")} />
          </div>

          <CustomButton text="Next" type="submit" fullWidth={true} />
        </div>
      </form>
    </div>
  );
}
