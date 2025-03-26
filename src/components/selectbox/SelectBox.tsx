import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/stores/useFormStore";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type Options = {
  placeholder: string;
  options: { id: number; name: string }[];
  className?: string;
  name: string;
  register: any;
  setValue: any;
  selectedValue?: string | undefined;
  error: string | undefined;
  watch: any;
  clearErrors?: any;
};

export default function SelectBox({
  placeholder,
  options,
  className,
  name,
  register,
  setValue,
  selectedValue,
  error,
  watch,
  clearErrors,
}: Options) {
  const { updatePage } = useFormStore();
  const [isError, setIsError] = useState<string | undefined>(error);

  useEffect(() => {
    setIsError(error);
  }, [error]);

  useEffect(() => {
    if (updatePage === 2) {
      if (selectedValue) {
        setIsError(undefined);
        setValue(name, selectedValue);
        clearErrors(name); // ✅ clear error if value is present on load
      }
    }
  }, [updatePage]);

  useEffect(() => {
    if (selectedValue) {
      setIsError(undefined);
      setValue(name, selectedValue);

      clearErrors(name); // ✅ clear error if value is present on load
    }
  }, [selectedValue]);

  return (
    <div>
      <Select
        onValueChange={(value) => {
          if (value) {
            setIsError(undefined);
          }
          setValue(name, value);
        }}
        value={selectedValue ? String(selectedValue) : undefined}
      >
        <SelectTrigger
          className={twMerge(
            "w-full min-w-[150px] h-[45px] border-[1px] z-1",
            className,
            isError ? "border-red-500" : "border-inputBorder"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-inputBackground">
          {options.map((item, index) => {
            return (
              <SelectItem value={String(item.id)} key={index}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
        <input type="hidden" {...register(name)} />
      </Select>
      {isError && <p className="text-red-500">{error}</p>}
    </div>
  );
}
