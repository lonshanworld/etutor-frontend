import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Options = {
  placeholder: string;
  options: string[];
  className?: string;
  name: string;
  register: any;
  watch: any;
  setValue: any;
};

export default function SelectBox({
  placeholder,
  options,
  className,
  name,
  register,
  watch,
  setValue,
}: Options) {
  return (
    <Select
      onValueChange={(value) => setValue(name, value)}
      defaultValue={watch(name)}
    >
      <SelectTrigger
        className={`w-full min-w-[150px] h-[45px] border-[1px] border-inputBorder z-1 ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-inputBackground">
        {options.map((item, index) => {
          return (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
      <input type="hidden" {...register(name)} />
    </Select>
  );
}
