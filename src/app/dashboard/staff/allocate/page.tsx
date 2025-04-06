export const dynamic = "force-dynamic";

import AllocateTutorPage from "./tutor/page";

export default async function AllocatePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    name?: string;
  }>;
}) {
  return (
    <div>
      <AllocateTutorPage searchParams={searchParams} />
    </div>
  );
}
