import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function PaginationDemo({
  pageCount,
  currentPage,
  url,
  remainingUrl = "",
}: {
  pageCount: number;
  currentPage: number;
  url: string;
  remainingUrl?: string;
}) {
  const router = useRouter();

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Pagination className="flex justify-end max-sm:me-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            className={twMerge(
              "max-sm:w-7 max-sm:h-7",
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            )}
            onClick={() =>
              router.push(`${url}?page=${currentPage - 1}${remainingUrl ?? ""}`)
            }
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page} className="">
            <PaginationLink
              onClick={() =>
                router.push(`${url}?page=${page}${remainingUrl ?? ""}`)
              }
              isActive={page === currentPage}
              className={twMerge(
                "max-sm:w-7 max-sm:h-7",
                page === currentPage ? "pointer-events-none " : undefined
              )}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={twMerge(
              "max-sm:w-7 max-sm:h-7",
              currentPage === pageCount || !pageCount
                ? "pointer-events-none opacity-50"
                : undefined
            )}
            aria-disabled={currentPage === pageCount || !pageCount}
            onClick={() =>
              router.push(`${url}?page=${currentPage + 1}${remainingUrl ?? ""}`)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
