import Image from "next/image";
import IntroLogo from "@/assets/svgs/introLogo.svg";

export default function Home() {
  // const { isError } = errorStore();
  return (
    <div
    className="w-full h-full relative flex flex-col items-center justify-center gap-1">
      {/* {isError && <ErrorPopup />} */}
      <Image 
      src={IntroLogo}
      width={200}
      height={200}
      alt="Proton University"/>
      <span className="text-lg capitalize text-theme">Proton University</span>
      <span className="text-3xl capitalize text-font pt-5 font-bold">Ready to Learn ?</span>
    </div>
  );
}
