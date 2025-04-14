"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Options = {
  placeholder: string;
  url: string;
  className?: string;
};

export default function FilterBox({ placeholder, url, className }: Options) {
  const options = [
    {
      name: "Active now",
      value: "0d",
    },
    {
      name: "Active 7 days ago",
      value: "7d",
    },
    {
      name: "Active 28 days ago",
      value: "28d",
    },
  ];

  const handleFilter = (value: string) => {
    if (value === "all") {
      window.location.href = url;
    } else {
      window.location.href = `${url}?filter=${value}`;
    }
  };
  return (
    <Select onValueChange={(value) => handleFilter(value)}>
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
            <SelectItem
              className="max-sm:text-sm"
              value={item.value}
              key={index}
            >
              {item.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
