import { createPortal } from "react-dom";

export default function WarningPopup({
  title,
  message,
  setShowWarning,
  onContinue,
}: {
  title: string;
  message: string;
  setShowWarning: any;
  onContinue: () => void;
}) {
  return createPortal(
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[350px] md:w-[500px] lg:w-[650px] bg-background z-20 rounded-lg shadow-lg border border-boardFile">
      <div className="max-md:p-5 p-8 pe-5 pb-5">
        <div className="flex items-center max-sm:gap-2 gap-4">
          <img src="/assets/svgs/warning.svg" alt="" />
          <h1 className="max-md:text-2xl text-3xl font-semibold text-headingColor">
            {title}
          </h1>
        </div>
        <p className="max-md:ms-0 ms-4 mt-3">{message}</p>

        <div className="flex gap-5 mt-7 justify-end">
          <button
            className="text-textColor px-5 py-2 rounded-full font-bold"
            onClick={() => setShowWarning(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-md font-bold"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
      {/* <div className="w-full bg-background pt-0 pb-5 px-5 flex justify-end">
        
      </div> */}
    </div>,
    document.body
  );
}
