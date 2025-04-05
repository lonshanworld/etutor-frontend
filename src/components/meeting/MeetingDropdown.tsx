import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

interface Props {
  label: string;
  placeholder: string;
  options: string[];
  className?: string;
}

export default function FilterBox({
  label,
  placeholder,
  options,
  className,
}: Props) {
  return (
    <div>
      <label>{label}</label>
      <Select>
        <SelectTrigger
          className={`w-full min-w-[150px] h-[37.6px] sm:h-[45px] border-[1px] max-sm:text-sm border-inputBorder bg-transparent z-1 ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='bg-inputBackground'>
          {options.map((item, index) => {
            return (
              <SelectItem
                className='max-sm:text-sm'
                value={item}
                key={index}
              >
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
