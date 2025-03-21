export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-svh bg-background md:pl-5 flex flex-col overflow-clip">
      {children}
    </div>
  );
}
