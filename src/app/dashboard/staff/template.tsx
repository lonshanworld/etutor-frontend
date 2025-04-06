export default function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full max-h-svh overflow-y-auto custom-scrollbar pt-8 pb-24 border-t-2 border-secondaryBackground">
      {children}
    </div>
  );
}
