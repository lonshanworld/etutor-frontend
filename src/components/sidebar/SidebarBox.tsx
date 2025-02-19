"use client"

import Image from "next/image";

export default function SideBarBox(
    {
        icon,
        selectedIcon,
        label,
        isSelected,
        onClick,
    } : {
        icon : any,
        selectedIcon : any,
        label : string,
        isSelected : boolean,
        onClick : ()=>void,
    }
) {
    return (
        <button
        onClick={()=>onClick()}
        className={`rounded-lg ${isSelected ? "bg-secondaryBackground text-theme" : "text-cusGray"} flex flex-row gap-3 justify-center items-center w-full h-min py-2`}>
            
            <Image 
            src={isSelected ? selectedIcon : icon}
            width={24}
            height={24}
            alt="Icon"/>
            <span className="text-lg md:text-xl font-bold">{label}</span>
        </button>
    );
}