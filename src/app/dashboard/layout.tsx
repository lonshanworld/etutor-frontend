import DashboardAppbar from "@/components/appbar/DashboardAppbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen bg-background md:pl-5 flex flex-col  ">
      <div className="py-2 pr-4">
        <DashboardAppbar />
      </div>
      {/* <div
            className="w-60 h-full bg-red-400">

            </div> */}
      {children}
    </div>
  );
}
