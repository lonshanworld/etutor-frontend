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
        className={`w-full min-w-[150px] h-[45px] border-[1px] border-inputBorder z-1 ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-inputBackground">
        <SelectItem value="all" defaultChecked={true}>
          All
        </SelectItem>
        {options.map((item, index) => {
          return (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          );
        })}
        {/* <SelectItem value="system">Email</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
