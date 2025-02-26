

export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div
        className="w-screen h-screen bg-background md:pl-5 flex flex-col  ">
            {children}
        </div>
        
    );
}