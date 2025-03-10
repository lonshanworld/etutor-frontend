export default function WarningPopup({
  username,
  setShowWarning,
  setShowToast,
}: {
  username: string | null;
  setShowWarning: any;
  setShowToast: any;
}) {
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[350px] md:w-[500px] lg:w-[650px] bg-background z-20 rounded-lg">
      <div className="max-md:p-5 p-8 pe-5 pb-5">
        <div className="flex items-center max-sm:gap-2 gap-4">
          <img src="/assets/svgs/warning.svg" alt="" />
          <h1 className="max-md:text-2xl text-3xl font-semibold text-headingColor">
            Confirm Deactivation
          </h1>
        </div>
        <p className="max-md:ms-0 ms-16 mt-3">
          Are you sure you want to deactivate
          <b className="text-theme">{" " + username}</b> account? This action
          may effect related functionalities.
        </p>

        <div className="flex gap-5 mt-7 justify-end">
          <button
            className="text-textColor px-5 py-2 rounded-full font-bold"
            onClick={() => setShowWarning(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-5 py-2 rounded-md font-bold"
            onClick={() => {
              setShowWarning(false);
              setShowToast(true);
            }}
          >
            Deactivate
          </button>
        </div>
      </div>
      {/* <div className="w-full bg-background pt-0 pb-5 px-5 flex justify-end">
        
      </div> */}
    </div>
  );
}
