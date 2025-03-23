import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SuccessImage from "@/assets/images/Success.png";
import ErrorImage from "@/assets/svgs/warning.svg";
import { twMerge } from "tailwind-merge";

interface ToastProps {
  message?: string;
  type?: string;
}

export default function Toast({ message, type }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message && type) {
      setIsVisible(true); // Toast becomes visible

      // Animate the progress bar smoothly over 3s (3000ms)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval); // Stop the progress bar when it reaches 0
            return 0;
          }
          return prev - 2;
        });
      }, 60); // Decrease 1% every 30ms (100 * 30ms = 3000ms, or 3 seconds)

      // Close the toast after 3 seconds, which matches the duration of the progress bar
      const timeout = setTimeout(() => {
        handleClose(); // Trigger the close action after 3 seconds
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(timeout);
      };
    }
  }, [message, type]);

  const handleClose = () => {
    setIsClosing(true); // Start the closing animation
    setTimeout(() => {
      setIsVisible(false); // Hide the toast after the animation duration
    }, 300); // Match the exit animation duration (300ms)
  };

  return (
    <div
      className={`fixed top-[70px] right-0 sm:w-[350px] md:w-[400px] bg-toastBg text-toastFont text-wrap p-0 rounded-lg shadow-lg overflow-hidden
        transition-transform duration-300 ease-in-out z-20
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-80 opacity-0"} 
        ${isClosing ? "translate-x-full opacity-0" : ""}`}
    >
      <div className="text-toastFont px-6 py-3 flex">
        <img
          src={type === "success" ? SuccessImage.src : ErrorImage.src}
          className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] mt-1"
          alt=""
        />
        <div className="ms-3">
          <h1 className="md:text-xl font-bold">
            {type === "success" ? "Success" : "Error"}
          </h1>
          <span className="text-[12px] md:text-sm">{message}</span>
        </div>
      </div>
      <div
        className={twMerge(
          "h-1 md:h-2 transition-all duration-50",
          type === "success" ? "bg-theme" : "bg-red-500"
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
