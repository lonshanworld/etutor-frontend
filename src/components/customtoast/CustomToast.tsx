import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SuccessImage from "@/assets/images/Success.png";
import ErrorImage from "@/assets/svgs/warning.svg";
import { twMerge } from "tailwind-merge";

interface ToastProps {
  message: string;
  type: string;
}

export default function Toast({ message, type }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // Ensures animation runs

    // Animate the progress bar smoothly over 5s
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1, 0));
    }, 50); // 50ms * 100 = 5000ms (5s)

    const timeout = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // setTimeout(onClose, 300); // Delay removal for exit animation
  };

  return (
    <div
      className={`fixed top-[70px] right-5 w-[350px] bg-toastBg text-toastFont text-wrap p-0 rounded-lg shadow-lg overflow-hidden
        transition-transform duration-300 ease-in-out 
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-80 opacity-0"} 
        ${isClosing ? "translate-x-full opacity-0" : ""}`}
    >
      <div className="text-toastFont px-6 py-3 flex">
        <img
          src={type === "success" ? SuccessImage.src : ErrorImage.src}
          className="w-[40px] h-[40px] mt-1"
          alt=""
        />
        <div className="ms-3">
          <h1 className="text-xl font-bold">Success</h1>
          <span className="text-sm">{message}</span>
        </div>
      </div>
      <div
        className={twMerge(
          "h-2 transition-all duration-50",
          type === "success" ? "bg-theme" : "bg-red-500"
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
