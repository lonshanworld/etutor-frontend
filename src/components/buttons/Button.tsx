interface Props {
  text: string;
  type: "submit" | "button";
  fullWidth?: boolean;
  onCLick?: () => void;
}

export default function CustomButton({
  text,
  type,
  fullWidth = false,
  onCLick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onCLick}
      className={`${
        fullWidth ? "w-full" : "w-auto"
      } bg-theme text-white py-2 px-4 rounded-lg hover:bg-themeHover transition-300 text-center`}
    >
      {text}
    </button>
  );
}
