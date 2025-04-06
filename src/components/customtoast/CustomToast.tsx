import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SuccessImage from "@/assets/images/Success.png";
import ErrorImage from "@/assets/svgs/warning.svg";
import { twMerge } from "tailwind-merge";

interface ToastProps {
  message?: string;
  type?: string;
}

const getProgressBarColor = (type: string = "") => {
  switch (type.toLowerCase()) {
    case "success":
      return "bg-theme";
    case "warning":
      return "bg-yellow-500";
    case "error":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function Toast({ message, type }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false); // Start hidden
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message && type) {
      setTimeout(() => setIsVisible(true), 10); // Delay to allow animation

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prev - 2;
        });
      }, 60);

      const timeout = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [message, type]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  return (
    <div
      className={`fixed top-[70px] right-0 sm:w-[350px] md:w-[400px] bg-toastBg text-toastFont text-wrap p-0 rounded-lg shadow-lg overflow-hidden
        transition-transform duration-300 ease-in-out z-[100]
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0"} 
        ${isClosing ? "translate-x-[100%] opacity-0" : ""}`}
    >
      <div className="text-toastFont px-6 py-3 flex">
        <img
          src={type === "success" ? SuccessImage.src : ErrorImage.src}
          className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] mt-1"
          alt=""
        />
        <div className="ms-3">
          <h1 className="md:text-xl font-bold capitalize">{type}</h1>
          <span className="text-[12px] md:text-sm">{message}</span>
        </div>
      </div>
      <div
        className={twMerge(
          "h-1 md:h-2 transition-all duration-50",
          getProgressBarColor(type)
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
