import InputField from "../../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../../buttons/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";
import { DayPicker } from "../../daypicker/DayPicker";
import { useSelectedUser } from "@/stores/useSelectedUser";
import { useEffect } from "react";
import { createStaff } from "@/api/services/staffs";
import { useToast } from "@/stores/useToast";

type Props = {
  setPageForm: (page: number) => void;
};

const StaffSchema = z.object({
  emgContactName: z
    .string()
    .min(2, { message: "Emergency Contact Name is required." }),
  emgContactPhone: z
    .string()
    .min(9, { message: "This is not a valid phone number" }),
  startDate: z.string().min(1, { message: "Start Date is required." }),
});

type StaffSchemaType = z.infer<typeof StaffSchema>;

export default function StaffPage({ setPageForm }: Props) {
  const {
    setShowForm,
    formData,
    staffData,
    setStaffData,
    isUpdateFormRendered,
    isUpdateFormModified,
    setUpdateStaffData,
  } = useFormStore();
  const { selectedUser } = useSelectedUser();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StaffSchemaType>({
    resolver: zodResolver(StaffSchema),
    mode: "onBlur",
    defaultValues: staffData,
  });

  useEffect(() => {
    if (selectedUser && !isUpdateFormModified) {
      setUpdateStaffData({
        emgContactName: selectedUser.info.emergency_contact_name,
        emgContactPhone: selectedUser.info.emergency_contact_phone,
        startDate: selectedUser.info.start_date,
      });
    }
  }, [selectedUser, setUpdateStaffData]);

  const onSubmit: SubmitHandler<StaffSchemaType> = async (data, e: any) => {
    e.preventDefault();
    setStaffData(data);
    setShowForm();
    setPageForm(1);
    const staffData = {
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      email: formData.email,
      date_of_birth: formData.dob,
      nationality: formData.nationality,
      gender: formData.gender,
      passport: formData.passportNo,
      address: formData.address,
      phone_number: formData.phoneNo,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      start_date: data.startDate,
      emergency_contact_name: data.emgContactName,
      emergency_contact_phone: data.emgContactPhone,
    };

    try {
      const response = await createStaff(staffData);
      if (response.message === "success") {
        showToast("Staff account created successfully", "success");
        setTimeout(() => {
          location.reload();
        }, 3000);
      } else {
        showToast(response.errorText, "error");
      }
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  console.log(errors);

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid-2">
            <div>
              <InputField
                id="emgContactName"
                label="Emergency Contact Name"
                type="text"
                register={register("emgContactName")}
                error={{
                  name: errors.emgContactName ? "emgContactName" : null,
                  message: errors?.emgContactName?.message,
                }}
              />
            </div>
            <div>
              <InputField
                id="emgContactPhone"
                label="Emergency Contact Phone"
                type="text"
                register={register("emgContactPhone")}
                error={{
                  name: errors.emgContactPhone ? "emgContactPhone" : null,
                  message: errors?.emgContactPhone?.message,
                }}
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <Label>Join Date</Label>
              <DayPicker
                input="startDate"
                watch={watch}
                setValue={setValue}
                register={register("startDate", {
                  required: "startDate is required",
                })}
                error={{
                  name: errors.startDate ? "startDate" : null,
                  message: errors?.startDate?.message,
                }}
              />
              {/* {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )} */}
              <div></div>
            </div>
          </div>

          <CustomButton
            text={isUpdateFormRendered ? "Update Account" : "Create Account"}
            type="submit"
            fullWidth={true}
          />
        </div>
      </form>
    </div>
  );
}
