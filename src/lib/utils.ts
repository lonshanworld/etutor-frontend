import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CustomToast from "../components/customtoast/CustomToast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkExist( data : any) : boolean{
  return (data !== null )&&( data!== undefined);
}

export function formatTimestamp(timestamp : number) : {
  date : string;
  time : string;
} {
  const date = new Date(timestamp);
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date : datePart,
    time : timePart,
  }
}