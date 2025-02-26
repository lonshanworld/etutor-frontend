import Image from "next/image";
import UniLogo from "@/assets/svgs/unilogo.svg";

export default function LogoBox(
    {
        withBox,
        width,
        height,
    } : {
        withBox : boolean,
        width? : string,
        height? : string,
    }
){
    return (
        <div
        className={`${width ?? "w-[100px]"} ${height ?? "h-[40px]"} pl-2 ${withBox && "rounded-md shadow-md"} bg-theme flex justify-center items-center`}>
            <Image 
            src={UniLogo}
            alt="University Logo"
            width={110}
            height={60}
            />
        </div>
    )
}