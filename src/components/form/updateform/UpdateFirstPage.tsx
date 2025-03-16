import InputField from "../../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../../buttons/Button";
import { DayPicker } from "../../daypicker/DayPicker";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioButton } from "../../radioButton/RadioButton";
import { useFormStore } from "@/stores/useFormStore";
import { useEffect } from "react";
import { UserRole } from "@/model/user";
import { useSelectedUser } from "@/stores/useSelectedUser";
import { UpdateFormSchema, UpdateFormSchemaType } from "@/model/form";
import { set } from "date-fns";

type Props = {
  setPageForm: (page: number) => void;
  role: UserRole | null;
};

export default function UpdateFirstPage({ setPageForm }: Props) {
  const {
    formData,
    setUpdateFormData,
    role,
    isUpdateFormRendered,
    isUpdateFormModified,
    setUpdateFormModified,
  } = useFormStore();
  const { selectedUser } = useSelectedUser();

  useEffect(() => {
    if (selectedUser && !isUpdateFormModified) {
      setUpdateFormData(selectedUser);
    }
  }, [selectedUser, setUpdateFormData]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateFormSchemaType>({
    resolver: zodResolver(UpdateFormSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: formData?.firstName ?? "",
      middleName: formData?.middleName ?? undefined,
      lastName: formData?.lastName ?? "",
      address: formData?.address ?? undefined,
      nationality: formData?.nationality ?? undefined,
      gender: formData?.gender ?? "",
      dob: formData?.dob ?? "",
      passportNo: formData?.passportNo ?? undefined,
      phoneNo: formData?.phoneNo ?? "",
      email: formData?.email ?? "",
      password: formData?.password ?? undefined,
      confirmPassword: formData?.confirmPassword ?? undefined,
      role: formData?.role ?? undefined,
    },
  });

  useEffect(() => {
    clearErrors();

    if (selectedUser) {
      Object.entries(selectedUser).forEach(([key, value]) => {
        setValue(key as keyof UpdateFormSchemaType, value);
      });
    }
  }, [selectedUser, setValue]);

  const onSubmit: SubmitHandler<any> = (data, e: any) => {
    e.preventDefault();
    console.log("updated data", formData);
    setPageForm(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changed");
    setUpdateFormModified(true);
    const { name, value } = e.target;
    setUpdateFormData({ [name]: value });
    console.log(name, value);
  };

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
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                id="middleName"
                label="Middle Name"
                register={register("middleName", { required: false })}
                type="text"
                value={formData.middleName}
                onChange={handleChange}
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
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid-2">
            <InputField
              id="address"
              label="Address"
              register={register("address", { required: false })}
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
            <InputField
              id="nationality"
              label="Nationality"
              type="text"
              register={register("nationality", { required: false })}
              value={formData.nationality}
              onChange={handleChange}
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
                value={formData.passportNo}
                onChange={handleChange}
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
                value={formData.phoneNo}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {/* {role && ( */}
            <input
              type="hidden"
              id="userRole"
              {...register("role")}
              value={Number(role)}
            />
            {/* )} */}
          </div>
          {isUpdateFormRendered && (
            <p className="text-gray-500 text-sm -mt-5">
              Please note that this password will overwrite the user's current
              password.
            </p>
          )}

          <CustomButton text="Next" type="submit" fullWidth={true} />
        </div>
      </form>
    </div>
  );
}
