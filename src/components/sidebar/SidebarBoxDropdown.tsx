"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";



export interface dropdownbtn {
    title : string,
    route : string,
}

export default function SidebarBoxDropdown(
    {
        btnTxt,
        btnIcon,
        btnList,
        isOpen,
        setIsOpen,
    } : {
        btnTxt : string,
        btnIcon : any,
        btnList : dropdownbtn[],
        isOpen : boolean,
        setIsOpen : (value :boolean)=>void,
    }
){
    
    const pathName = usePathname();
    const router = useRouter();  
    return (
        <div
              
              className={`rounded-lg ${
                isOpen
                  ? "bg-secondaryBackground text-theme"
                  : "text-cusGray hover:bg-secondaryBackground"
              } flex flex-col gap-3 justify-start items-center w-full pt-2 pl-10 md:pl-8 transition-300`}
            >
              <button
              onClick={()=>setIsOpen(!isOpen)}
              className="flex flex-row gap-3 justify-start items-center w-full">

                <span className="text-lg font-bold">{btnTxt}</span>

                <MdOutlineArrowDropDownCircle className={`text-2xl ${isOpen ? "rotate-0 text-theme" : "rotate-90 text-cusGray"}`}/>
              </button>


              <div 
                className={`overflow-hidden w-full flex flex-col gap-3 transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 pb-2" : "max-h-0 opacity-0 pb-0"
                }`}
            >
                {btnList.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => { router.push(item.route);}}
                        className={`w-full ${item.route === pathName ? "text-theme" : "text-cusGray"} hover:border hover:border-theme hover:border-opacity-30 rounded-lg  transition-colors flex flex-row justify-end items-center pr-3 pl-2 py-2 gap-1`}
                    >   
                        {/* <Image
                            src={btnIcon}
                            width={22}
                            height={22}
                            alt="Icon"
                        /> */}
                        <FaArrowRight className={`${item.route === pathName ? "text-theme" : "text-cusGray"} text-lg`}/>
                        <span>{item.title}</span>
                        
                    </button>
                ))}
            </div>
        </div>
    );
}