import DashboardAppbar from "@/components/appbar/DashboardAppbar";

export default function DashboardTemplate({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        // <div
        // className="px-2 md:px-5 w-full h-full">
        //   <div
        //   className="py-2">
        //     <DashboardAppbar />
        //   </div>
          
        //   {children}
        // </div>
        <>{children}</>
    );
}