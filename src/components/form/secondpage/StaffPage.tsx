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
import { createStaff, updateStaff } from "@/api/services/staffs";
import { useToast } from "@/stores/useToast";
import { checkUpdatedValue } from "@/utils/checkUpdatedValues";

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
    updatedData,
  } = useFormStore();
  const { selectedUser, lastSelectedUserId, setLastSelectedUserId } =
    useSelectedUser();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StaffSchemaType>({
    resolver: zodResolver(StaffSchema),
    mode: "onBlur",
    defaultValues: staffData,
  });

  useEffect(() => {
    const subscription = watch((data) => {
      console.log("watching...", data);
      setStaffData(data); // Save current form data to global state
    });
    return () => subscription.unsubscribe();
  }, [watch, setStaffData]);

  useEffect(() => {
    if (selectedUser && selectedUser.id !== lastSelectedUserId) {
      const updateData = {
        emgContactName: selectedUser.info.emergency_contact_name || "",
        emgContactPhone: selectedUser.info.emergency_contact_phone || "",
        startDate: selectedUser.info.start_date || "",
      };
      console.log("resetting", selectedUser.id, lastSelectedUserId);
      setUpdateStaffData(updateData);
      reset(updateData);

      setLastSelectedUserId(selectedUser.id);

      // ✅ Use setValue to update form values dynamically
      Object.keys(updateData).forEach((key) => {
        setValue(
          key as keyof StaffSchemaType,
          updateData[key as keyof StaffSchemaType]
        );
      });
    }
  }, [selectedUser, setUpdateStaffData, setValue]);

  const onSubmit: SubmitHandler<StaffSchemaType> = async (data, e: any) => {
    e.preventDefault();
    setStaffData(data);
    setShowForm();
    errors && console.log(errors);
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

    if (!isUpdateFormRendered) {
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
    } else {
      if (selectedUser) {
        const updatedInfo = {
          emgContactName: selectedUser.info.emergency_contact_name,
          emgContactPhone: selectedUser.info.emergency_contact_phone,
          startDate: selectedUser.info.start_date,
        };
        const updatedFields = checkUpdatedValue(data, updatedInfo);
        const allUpdatedFields = { ...updatedData, ...updatedFields };
        const finalUpdatedData = Object.fromEntries(
          Object.entries({
            first_name: allUpdatedFields.firstName,
            middle_name: allUpdatedFields.middleName,
            last_name: allUpdatedFields.lastName,
            email: allUpdatedFields.email,
            date_of_birth: allUpdatedFields.dob,
            nationality: allUpdatedFields.nationality,
            gender: allUpdatedFields.gender,
            passport: allUpdatedFields.passportNo,
            address: allUpdatedFields.address,
            phone_number: allUpdatedFields.phoneNo,
            start_date: allUpdatedFields.startDate,
            emergency_contact_name: allUpdatedFields.emgContactName,
            emergency_contact_phone: allUpdatedFields.emgContactPhone,
          }).filter(([_, value]) => value !== null && value !== undefined)
        );

        console.log("updating student data...", finalUpdatedData);
        if (Object.keys(finalUpdatedData).length > 0) {
          try {
            const response = await updateStaff(
              finalUpdatedData,
              selectedUser.id
            );
            if (response.message === "success") {
              showToast("Staff account updated successfully", "success");
              setTimeout(() => {
                location.reload();
              }, 3000);
            } else {
              console.log("res error", response.errorText);
              showToast(response.errorText, "error");
            }
          } catch (error: any) {
            console.log("catch error", error);
            showToast(error.message, "error");
          }
        } else {
          showToast("No changes have been made!", "error");
        }
      }
    }
  };

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
                value={staffData?.startDate}
                setValue={setValue}
                register={register("startDate", {
                  required: "startDate is required",
                })}
                error={{
                  name: errors.startDate ? "startDate" : null,
                  message: errors?.startDate?.message,
                }}
              />
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
