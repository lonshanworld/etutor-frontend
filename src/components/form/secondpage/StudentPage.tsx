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
import CustomToast from "../../customtoast/CustomToast";
import { useToast } from "@/stores/useToast";
import { useSelectedUser } from "@/stores/useSelectedUser";

type Props = {
  setPageForm: (page: number) => void;
};

const StudentSchema = z.object({
  emgContactName: z.string().optional(),
  emgContactPhone: z.string().optional(),
  major: z.string().min(1, { message: "Major is required." }),
});

type StudentSchemaType = z.infer<typeof StudentSchema>;

export default function StudentPage({ setPageForm }: Props) {
  const {
    setShowForm,
    formData,
    studentData,
    setStudentData,
    isUpdateFormRendered,
    isUpdateFormModified,
    resetFormData,
  } = useFormStore();
  const { selectedUser } = useSelectedUser();

  const { toast, showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = !isUpdateFormRendered
    ? useForm<StudentSchemaType>({
        resolver: zodResolver(StudentSchema),
        mode: "onBlur",
      })
    : useForm<StudentSchemaType>({
        resolver: zodResolver(StudentSchema),
        mode: "onBlur",
        defaultValues: {
          emgContactName: "",
          emgContactPhone: "",
          major: "",
        },
      });

  const onSubmit: SubmitHandler<StudentSchemaType> = async (data, e: any) => {
    e.preventDefault();
    setStudentData(data);
    console.log("formdata", data);
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
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };
    console.log(studentData);

    if (!isUpdateFormRendered) {
      try {
        const response = await createStudent(studentData);
        console.log("status", response.status);
        if (response.message === "success") {
          showToast("Student account created successfully", "success");
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      } catch (error: any) {
        showToast(error.message, "error");
      }
    } else {
      const { password, password_confirmation, ...studentUpdateData } =
        studentData;
      if (selectedUser) {
        try {
          const response = await updateStudent(
            studentUpdateData,
            selectedUser.id
          );
          console.log("status", response.status);
          if (response.message === "success") {
            showToast("Student data update successfully", "success");
            setTimeout(() => {
              location.reload();
            }, 4000);
          }
        } catch (error: any) {
          showToast(error.message, "error");
        }
      }
    }
  };

  useEffect(() => {});

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
                options={["Level-4", "Level-5"]}
                className="mt-2"
                name="major"
                watch={watch}
                setValue={setValue}
                register={register}
              />
              {errors.major && (
                <p className="text-red-500">{errors.major.message}</p>
              )}
            </div>
          </div>

          <CustomButton text="Update Account" type="submit" fullWidth={true} />
        </div>
      </form>
    </div>
  );
}
