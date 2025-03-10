import InputField from "../inputfields/FormInputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../buttons/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBox from "../selectbox/SelectBox";
import { useFormStore } from "@/stores/useFormStore";

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
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(StudentSchema),
    mode: "onBlur",
  });
  const { setShowForm, formData, studentData, setStudentData } = useFormStore();

  const onSubmit: SubmitHandler<StudentSchemaType> = (data, e: any) => {
    e.preventDefault();
    setStudentData(data);
    setShowForm();
    setPageForm(1);
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

          <CustomButton text="Create Account" type="submit" fullWidth={true} />
        </div>
      </form>
    </div>
  );
}
