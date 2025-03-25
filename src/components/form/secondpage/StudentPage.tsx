"use client";
import InputField from "../../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../../buttons/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBox from "../../selectbox/SelectBox";
import { useFormStore } from "@/stores/useFormStore";
import { createStudent, updateStudent } from "@/api/services/students";
import { useEffect, useState } from "react";
import { useToast } from "@/stores/useToast";
import { useSelectedUser } from "@/stores/useSelectedUser";
import { useMajor } from "@/stores/useMajor";
import { twMerge } from "tailwind-merge";
import { checkUpdatedValue } from "@/utils/checkUpdatedValues";
import { User } from "@/model/user";

type Props = {
  setPageForm: (page: number) => void;
};

const StudentSchema = z.object({
  emgContactName: z
    .string()
    .min(2, { message: "Emergency Contact Name is required." }),
  emgContactPhone: z
    .string()
    .min(9, { message: "This is not a valid phone number" }),
  major: z.string().min(1, { message: "Major is required." }),
});

type StudentSchemaType = z.infer<typeof StudentSchema>;

export default function StudentPage({ setPageForm }: Props) {
  const {
    setShowForm,
    formData,
    studentData,
    setStudentData,
    setUpdateStudentData,
    isUpdateFormRendered,
    isUpdateFormModified,
    setUpdateFormModified,
    resetFormData,
    setSelectedMajor,
    updatedData,
  } = useFormStore();
  const { selectedUser } = useSelectedUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(StudentSchema),
    mode: "onBlur",
    defaultValues: studentData,
  });

  const getInfoFields = (selectedUser: User) => {
    return {
      emgContactName: selectedUser.info.emergency_contact_name,
      emgContactPhone: selectedUser.info.emergency_contact_phone,
      majorId: selectedUser.info.major_id,
    };
  };

  useEffect(() => {
    if (selectedUser && !isUpdateFormModified) {
      const infoData = getInfoFields(selectedUser);
      setUpdateStudentData(infoData);
      setSelectedMajor(selectedUser.info.major_id);
      reset(infoData);
    }
  }, [selectedUser, setUpdateStudentData]);

  useEffect(() => {
    if (studentData?.majorId) {
      setValue("major", String(studentData.majorId)); // ✅ Set value on load
      clearErrors("major"); // ✅ Clear error if any, since we have a value
    }
  }, [studentData?.majorId]);

  const { majors } = useMajor();

  const { showToast } = useToast();

  const onSubmit: SubmitHandler<StudentSchemaType> = async (data, e: any) => {
    e.preventDefault();
    setStudentData(data);
    errors && console.log(errors);

    setShowForm();
    setPageForm(1);
    const studentData = {
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
      major_id: data.major,
      emergency_contact_name: data.emgContactName,
      emergency_contact_phone: data.emgContactPhone,
    };

    if (!isUpdateFormRendered) {
      try {
        const response = await createStudent(studentData);
        if (response.message === "success") {
          showToast("Student account created successfully", "success");
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
          major: selectedUser.info.major_id,
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
            major_id: allUpdatedFields.major,
            emergency_contact_name: allUpdatedFields.emgContactName,
            emergency_contact_phone: allUpdatedFields.emgContactPhone,
          }).filter(([_, value]) => value !== null && value !== undefined)
        );

        console.log("updating student data...", finalUpdatedData);
        if (Object.keys(finalUpdatedData).length > 0) {
          try {
            const response = await updateStudent(
              finalUpdatedData,
              selectedUser.id
            );
            if (response.message === "success") {
              showToast("Student account updated successfully", "success");
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
              <Label>Major</Label>
              <SelectBox
                placeholder="Select Major"
                options={majors}
                watch={watch}
                className="mt-2"
                name="major"
                setValue={setValue}
                register={register}
                selectedValue={
                  watch("major") ||
                  (studentData?.majorId
                    ? String(studentData?.majorId)
                    : undefined)
                }
                error={errors.major && errors.major.message}
                clearErrors={clearErrors}
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
