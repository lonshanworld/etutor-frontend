interface Props {
  text: string;
  type: "submit" | "button";
  fullWidth?: boolean;
  onClick?: (event: React.FormEvent) => void;
}

export default function Button({
  text,
  type,
  fullWidth = false,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        fullWidth ? "w-full" : "w-auto"
      } bg-theme text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition text-center`}
    >
      {text}
    </button>
  );
}
