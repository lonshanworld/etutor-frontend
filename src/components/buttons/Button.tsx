interface Props {
  text: string;
  type: "submit" | "button";
  fullWidth?: boolean;
  onClick?: (event?: React.FormEvent) => void;
}

export default function CustomButton({
  text,
  type,
  fullWidth = false,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={(e :any)=>onClick && onClick(e)}
      className={`${
        fullWidth ? "w-full" : "w-auto"
      } bg-theme text-white py-2 px-4 rounded-lg hover:bg-themeHover transition-300 text-center`}
    >
      {text}
    </button>
  );
}
