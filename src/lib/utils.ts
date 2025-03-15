import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CustomToast from "../components/customtoast/CustomToast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
