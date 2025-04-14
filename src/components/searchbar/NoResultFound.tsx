import NotFoundImage from "@/assets/images/Not_Found.png";
export default function NoResultFound() {
  return (
    <div className="flex flex-col -mt-10 items-center select-none pointer-events-none">
      <img src={NotFoundImage.src} className="w-[255px] h-[255px]" alt="" />
      <h1 className="text-[40px] sm:text-6xl font-bold text-theme">
        No Result Found
      </h1>
      <p className="font-bold text-lg sm:text-2xl text-headingColor mt-3">
        We couldn't find what you search for.
      </p>
    </div>
  );
}
