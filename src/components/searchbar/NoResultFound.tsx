import NoResultImage from "@/assets/svgs/noresultimage.svg";
import NotFoundImage from "@/assets/images/Not_Found.png";
export default function NoResultFound() {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none">
      <img src={NotFoundImage.src} className="w-[255px] h-[255px]" alt="" />
      <h1 className="text-6xl font-bold text-theme">No Result Found</h1>
      <p className="font-bold text-lg text-headingColor">
        We couldn't find what you search for.
      </p>
    </div>
  );
}
