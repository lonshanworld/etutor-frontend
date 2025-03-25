"use client";

import LoadingSpinner from "@/components/loadingspinner/LoadingSpinner";
import { ConvexClientProvider } from "@/provider/ConvexClientProvider";

export default function MainTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { setError } = errorStore();
  return (
    <ConvexClientProvider>
      <LoadingSpinner />
      {children}
      </ConvexClientProvider>
  );
}
