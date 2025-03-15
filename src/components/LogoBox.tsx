"use client";
import Image from "next/image";
import UniLogo from "@/assets/svgs/lightunilogo.svg";
import darkUniLogo from "@/assets/svgs/darkunilogo.svg";
import { useThemeStore } from "@/stores/useThemeStore";

export default function LogoBox() {
  const { theme } = useThemeStore();
  return (
    <Image
      src={theme === "light" ? UniLogo : darkUniLogo}
      className="w-[150px] h-[45px]"
      alt="University Logo"
      priority={true}
    />
  );
}
