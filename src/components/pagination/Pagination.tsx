import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { twMerge } from "tailwind-merge";

export function PaginationDemo({
  pageCount,
  currentPage,
  url,
}: {
  pageCount: number;
  currentPage: number;
  url: string;
}) {
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
            href={`${url}?page=${currentPage - 1}`}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page} className="">
            <PaginationLink
              href={`${url}?page=${page}`}
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
              currentPage === pageCount
                ? "pointer-events-none opacity-50"
                : undefined
            )}
            aria-disabled={currentPage === pageCount}
            href={`${url}?page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
