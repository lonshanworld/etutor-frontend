import InputField from "../inputfields/InputField";
import { Label } from "@/components/ui/label";
import CustomButton from "../buttons/Button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/stores/useFormStore";
import { DayPicker } from "../daypicker/DayPicker";

type Props = {
  setPageForm: (page: number) => void;
};

const StaffSchema = z.object({
  emgContactName: z.string().optional(),
  emgContactPhone: z.string().optional(),
  accessLevel: z.string().optional(),
  startDate: z.string().min(1, { message: "Start Date is required." }),
});

type StaffSchemaType = z.infer<typeof StaffSchema>;

export default function StaffPage({ setPageForm }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StaffSchemaType>({
    resolver: zodResolver(StaffSchema),
    mode: "onBlur",
  });
  const { setShowForm, formData, staffData, setStaffData } = useFormStore();

  const onSubmit: SubmitHandler<StaffSchemaType> = (data, e: any) => {
    e.preventDefault();
    setStaffData(data);
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
