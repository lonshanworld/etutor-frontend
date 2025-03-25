import useLoading from "@/stores/useLoading";
import { useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function LoadingSpinner() {
  const { isLoading } = useLoading();
  return (
    <>
      {isLoading && (
        <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 w-full h-svh bg-white/40">
          <div className="flex items-center justify-center h-svh">
            <div className="w-10 h-10 border-4 border-theme border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingSpinner;
