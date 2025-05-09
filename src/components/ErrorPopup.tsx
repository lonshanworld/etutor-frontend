import { errorStore } from "@/stores/errorStore";
import { IoClose } from "react-icons/io5";

export default function ErrorPopup() {
  const { message, clearError } = errorStore();

  return (
    <div>
      <div className="fixed p-10 text-center bg-background text-font w-[80%] sm:w-[50%] md:w-[50%] min-h-[299px] rounded-lg shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="flex justify-center mb-10">
          <IoClose className="text-6xl p-3 text-white rounded-full bg-red-500" />
        </div>
        <div className="max-h-[110px] overflow-auto mb-12">
          <p className="text-xl max-h-[110px] text-wrap">{message}</p>
        </div>
        <button
          className="p-2 rounded-md transition duration-300 bg-blue-800 text-white w-[99px] h-[38px]"
          onClick={clearError}
        >
          Ok
        </button>
      </div>
      <div className="bg-black opacity-30 fixed w-svw h-svh z-10 top-0 left-0"></div>
    </div>
  );
}
