export default function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full max-h-screen overflow-y-auto">{children}</div>;
}
