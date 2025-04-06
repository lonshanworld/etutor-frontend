export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-svw h-svh bg-background flex flex-col overflow-clip">
      {children}
    </div>
  );
}
