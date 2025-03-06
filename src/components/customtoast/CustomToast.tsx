import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import SuccessImage from "@/assets/images/Success.png";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
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
    setTimeout(onClose, 300); // Delay removal for exit animation
  };

  return (
    <div
      className={`fixed top-[70px] right-5 w-100 bg-toastBg text-toastFont p-0 rounded-lg shadow-lg overflow-hidden
        transition-transform duration-300 ease-in-out 
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-80 opacity-0"} 
        ${isClosing ? "translate-x-full opacity-0" : ""}`}
    >
      <div className="text-toastFont px-6 py-3 flex">
        <img src={SuccessImage.src} className="w-[30px] h-[30px] mt-1" alt="" />
        <div className="ms-3">
          <h1 className="text-xl font-bold">Success</h1>
          <span className="text-sm">{message}</span>
        </div>
      </div>
      <div
        className="h-2 bg-theme transition-all duration-50"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
