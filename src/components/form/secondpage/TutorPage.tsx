import InputField from "../../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../../buttons/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";
import { DayPicker } from "../../daypicker/DayPicker";
import { User } from "@/model/user";
import { useEffect } from "react";
import { useSelectedUser } from "@/stores/useSelectedUser";
import { useToast } from "@/stores/useToast";
import { createTutor, updateTutor } from "@/api/services/tutors";
import { checkUpdatedValue } from "@/utils/checkUpdatedValues";
import SelectBox from "@/components/selectbox/SelectBox";
import { useMajor } from "@/stores/useMajor";

type Props = {
  setPageForm: (page: number) => void;
};

const TutorSchema = z.object({
  qualifications: z
    .string()
    .min(1, { message: "Qualifications field is required." }),
  experience: z.number().min(1, { message: "Experience is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
});

type TutorSchemaType = z.infer<typeof TutorSchema>;

export default function TutorPage({ setPageForm }: Props) {
  const {
    setTutorData,
    setShowForm,
    formData,
    tutorData,
    setUpdateTutorData,
    isUpdateFormRendered,
    isUpdateFormModified,
    setUpdateFormModified,
    resetFormData,
    setSelectedMajor,
    updatedData,
  } = useFormStore();
  const { selectedUser, lastSelectedUserId, setLastSelectedUserId } =
    useSelectedUser();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TutorSchemaType>({
    resolver: zodResolver(TutorSchema),
    mode: "onBlur",
    defaultValues: tutorData,
  });

  const getInfoFields = (selectedUser: User) => {
    return {
      qualifications: selectedUser?.info?.qualifications,
      experience: selectedUser?.info?.experience,
      subject: selectedUser?.info?.subject_id,
    };
  };

  useEffect(() => {
    const subscription = watch((data) => {
      setTutorData(data); // Save current form data to global state
    });
    return () => subscription.unsubscribe();
  }, [watch, setTutorData]);

  useEffect(() => {
    if (selectedUser && selectedUser.id !== lastSelectedUserId) {
      const infoData = getInfoFields(selectedUser);
      setUpdateTutorData(infoData);
      reset(infoData);
      setLastSelectedUserId(selectedUser.id);
    }
  }, [selectedUser, setUpdateTutorData, reset]);

  useEffect(() => {
    if (tutorData?.subject) {
      setValue("subject", String(tutorData.subject)); // ✅ Set value on load
      clearErrors("subject"); // ✅ Clear error if any, since we have a value
    }
  }, [tutorData?.subject]);

  const { subjects } = useMajor();

  const { showToast } = useToast();

  const onSubmit: SubmitHandler<TutorSchemaType> = async (data, e: any) => {
    e.preventDefault();
    setTutorData(data);
    errors && console.log(errors);

    setShowForm();
    setPageForm(1);
    const tutorData = {
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
      qualifications: data.qualifications,
      experience: String(data.experience),
      subject_id: data.subject,
    };

    if (!isUpdateFormRendered) {
      try {
        const response = await createTutor(tutorData);
        if (response.message === "success") {
          showToast("Tutor account created successfully", "success");
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
        const updatedInfo = getInfoFields(selectedUser);
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
            qualifications: allUpdatedFields.qualifications,
            experience: String(allUpdatedFields.experience),
            subject_id: allUpdatedFields.subject,
          }).filter(([_, value]) => value !== null && value !== undefined)
        );

        console.log("updating tutorData data...", finalUpdatedData);
        if (Object.keys(finalUpdatedData).length > 0) {
          try {
            const response = await updateTutor(
              finalUpdatedData,
              selectedUser.id
            );
            if (response.message === "success") {
              showToast("Tutor account updated successfully", "success");
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
                id="qualifications"
                label="Qualifications"
                type="text"
                register={register("qualifications")}
                error={{
                  name: errors.qualifications ? "qualifications" : null,
                  message: errors?.qualifications?.message,
                }}
              />
            </div>
            <div>
              <InputField
                id="experience"
                label="Experience"
                type="number"
                register={register("experience", { valueAsNumber: true })}
                error={{
                  name: errors.experience ? "experience" : null,
                  message: errors?.experience?.message,
                }}
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <Label>Subject</Label>
              <SelectBox
                placeholder="Select Subject"
                options={subjects}
                watch={watch}
                className="mt-2"
                name="subject"
                setValue={setValue}
                register={register}
                selectedValue={watch("subject") || String(tutorData?.subject)}
                error={errors.subject && errors.subject.message}
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
