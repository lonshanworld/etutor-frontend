// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";


import "./../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-svh h-svh bg-background overflow-clip`}>
        {children}
      </body>
    </html>
  );
}
