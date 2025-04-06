import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const ChangePasswordInput = ({
  label,
  placeholder,
  register,
  error,
}: {
  label: string;
  placeholder: string;
  register: any;
  error: FieldError | undefined;
}) => {
  return (
    <div
      className={twMerge(
        "w-full flex justify-between items-center gap-x-3 sm:gap-x-10 border-b-2 place",
        error ? "border-red-500" : " border-inputBorder"
      )}
    >
      <label htmlFor="" className="min-w-[50px] sm:min-w-[100px]">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        {...register}
        className="peer bg-transparent w-full col-span-2 border-0 outline-none px-2 sm:px-5 py-2"
      />
    </div>
  );
};

export default ChangePasswordInput;
