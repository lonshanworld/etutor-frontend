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
import {
  UpdateFormSchema,
  UpdateFormSchemaType,
} from "@/utils/validationSchema";
import { set } from "date-fns";
import { checkUpdatedValue } from "@/utils/checkUpdatedValues";

type Props = {
  setPageForm: (page: number) => void;
  role: UserRole | null;
};

export default function UpdateFirstPage({ setPageForm }: Props) {
  const {
    formData,
    setUpdateFormData,
    setFormData,
    role,
    isUpdateFormRendered,
    isUpdateFormModified,
    setUpdateFormModified,
    updatePage,
    setUpdatedData,
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
      nationality: formData?.nationality ?? "",
      gender: formData?.gender ?? "",
      dob: formData?.dob ?? "",
      passportNo: formData?.passportNo ?? undefined,
      phoneNo: formData?.phoneNo ?? "",
      email: formData?.email ?? "",
      role: formData?.role ?? undefined,
    },
  });

  useEffect(() => {
    if (formData) {
      console.log("🔄 Syncing form fields with Zustand data:", formData); // Debugging

      Object.entries(formData).forEach(([key, value]) => {
        setValue(key as keyof UpdateFormSchemaType, value, {
          shouldValidate: true,
        });
      });
    }
  }, [formData, setValue]);

  const onSubmit: SubmitHandler<any> = (data, e: any) => {
    e.preventDefault();
    setUpdateFormModified(true);

    const updatedFields = checkUpdatedValue(data, selectedUser);
    // console.log("updated zustand data", data);
    // setUpdateFormData(updatedFields);
    setUpdatedData(updatedFields);
    setFormData(data);
    setPageForm(2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changed");
    const { name, value } = e.target;
    console.log(name, value);
    setUpdateFormData({ [name]: value });
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
                  name: errors.firstName ? "firstName" : "",
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
                  name: errors.lastName ? "lastName" : "",
                  message: errors?.lastName?.message,
                }}
              />
            </div>
          </div>

          <div className="grid-2">
            <InputField
              id="address"
              label="Address"
              register={register("address", { required: true })}
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
                watch={watch}
                value={formData.dob}
                setValue={setValue}
                register={register("dob", {
                  required: "DOB is required",
                })}
                error={{
                  name: errors.dob ? "dob" : null,
                  message: errors?.dob?.message,
                }}
              />
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

          <input
            type="hidden"
            id="userRole"
            {...register("role")}
            value={role}
          />

          <CustomButton
            text="Next"
            type="submit"
            fullWidth={true}
            onClick={() => console.log(formData)}
          />
        </div>
      </form>
    </div>
  );
}
