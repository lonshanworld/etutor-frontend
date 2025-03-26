// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";


import { getTokenCookies } from "@/lib/tokenCookies";
import "./../styles/globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={`w-svw h-svh bg-background overflow-clip`}>
        {children}
      </body>
    </html>
  );
}
