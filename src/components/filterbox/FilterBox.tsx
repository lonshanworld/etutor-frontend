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
};

export default function FilterBox({
  placeholder,
  options,
  className,
}: Options) {
  return (
    <Select>
      <SelectTrigger
        className={`w-full min-w-[150px] h-[37.6px] sm:h-[45px] border-[1px] max-sm:text-sm border-inputBorder z-1 ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-inputBackground">
        <SelectItem value="all" defaultChecked={true}>
          All
        </SelectItem>
        {options.map((item, index) => {
          return (
            <SelectItem className="max-sm:text-sm" value={item} key={index}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
