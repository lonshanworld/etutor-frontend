import InputField from "../../../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../../../buttons/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";
import { DayPicker } from "../../../daypicker/DayPicker";

type Props = {
  setPageForm: (page: number) => void;
};

const TutorSchema = z.object({
  qualifications: z
    .string()
    .min(1, { message: "Qualifications field is required." }),
  experience: z.number().min(1, { message: "Experience is required." }),
  startDate: z.string().min(1, { message: "Start Date is required." }),
});

type TutorSchemaType = z.infer<typeof TutorSchema>;

export default function TutorPage({ setPageForm }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TutorSchemaType>({
    resolver: zodResolver(TutorSchema),
    mode: "onBlur",
  });
  const { setShowForm, setTutorData } = useFormStore();

  const onSubmit: SubmitHandler<TutorSchemaType> = (data, e: any) => {
    e.preventDefault();
    setTutorData(data);
    setShowForm();
    setPageForm(1);

    // post request
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
                register={register("experience")}
                error={{
                  name: errors.experience ? "experience" : null,
                  message: errors?.experience?.message,
                }}
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <Label>Start Date</Label>
              <DayPicker
                watch={watch}
                setValue={setValue}
                register={register("startDate")}
                error={errors.startDate && errors.startDate.message}
              />
              {errors.startDate && (
                <p className="text-red-500">{errors.startDate.message}</p>
              )}
            </div>
          </div>

          <CustomButton text="Create Account" type="submit" fullWidth={true} />
        </div>
      </form>
    </div>
  );
}
