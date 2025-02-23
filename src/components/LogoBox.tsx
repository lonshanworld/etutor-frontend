import Image from "next/image";
import UniLogo from "@/assets/svgs/unilogo.svg";

export default function LogoBox() {
  return (
    <div className="w-[100px] h-[40px] pl-2 rounded-md shadow-md bg-theme flex justify-center items-center">
      <Image src={UniLogo} alt="University Logo" />
    </div>
  );
}
