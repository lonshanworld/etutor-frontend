import { twMerge } from "tailwind-merge";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect, useState } from "react";

export function RadioButton({
  mainLabel,
  value1,
  value2,
  label1,
  label2,
  register,
  watch,
  setValue,
  error,
}: any) {
  const [isError, setIsError] = useState(error);
  useEffect(() => {
    setIsError(error);
  }, [error]);
  return (
    <div>
      <Label>{mainLabel}</Label>
      <RadioGroup
        defaultValue="male"
        className="flex gap-8 mt-2"
        onValueChange={(gender) => {
          setValue("gender", gender);
          setIsError(null);
        }}
        value={watch("gender")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={value1}
            id="r1"
            className={twMerge(isError ? "border-red-500" : "border-theme")}
          />
          <Label htmlFor="r1" className="text-md">
            {label1}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={value2}
            id="r2"
            className={twMerge(isError ? "border-red-500" : "border-theme")}
          />
          <Label htmlFor="r2" className="text-md">
            {label2}
          </Label>
        </div>
      </RadioGroup>
      <input type="hidden" {...register} />
      {isError && <p className="text-red-500 mt-3 text-sm">{error}</p>}
    </div>
  );
}
