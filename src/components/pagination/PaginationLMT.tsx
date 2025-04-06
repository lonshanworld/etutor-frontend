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

export function PaginationLMT({
  pageCount,
  currentPage,
  onPageChange,
}: {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <Pagination className='flex justify-end max-sm:me-3'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            className={twMerge(
              "max-sm:w-7 max-sm:h-7",
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            )}
            onClick={() => {
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              className={twMerge(
                "max-sm:w-7 max-sm:h-7",
                page === currentPage ? "pointer-events-none" : undefined
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === pageCount}
            className={twMerge(
              "max-sm:w-7 max-sm:h-7",
              currentPage === pageCount ?
                "pointer-events-none opacity-50"
              : undefined
            )}
            onClick={() => {
              if (currentPage < pageCount) onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
