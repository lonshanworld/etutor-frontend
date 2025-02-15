import React from "react";

interface Props {
  text: string;
  type: "submit" | "button";
  fullWidth?: boolean;
  onCLick?: () => void;
}

const Button = ({ text, type, fullWidth = false, onCLick }: Props) => {
  return (
    <button
      type={type}
      onClick={onCLick}
      className={`${
        fullWidth ? "w-full" : "w-auto"
      } bg-[#099797] text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition text-center`}
    >
      {text}
    </button>
  );
};

export default Button;
