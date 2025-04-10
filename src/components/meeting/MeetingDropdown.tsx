import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller, Control } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  control: Control<any>;
  placeholder: string;
  options: string[];
  className?: string;
}

export default function MeetingDropdown({
  label,
  name,
  control,
  placeholder,
  options,
  className,
}: Props) {
  return (
    <div className='w-full'>
      <label
        className={`block mb-1 text-sm font-medium text-primaryText ${className}`}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <SelectTrigger
              className={`w-full min-w-[150px] h-[37.6px] sm:h-[45px] border-[1px] max-sm:text-sm border-inputBorder bg-transparent z-1 ${className}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='bg-inputBackground z-50'>
              {options.map((item, index) => (
                <SelectItem
                  className='max-sm:text-sm'
                  value={item}
                  key={index}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
