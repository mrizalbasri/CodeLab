"use client";

import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <Flex direction="column" gap="3" align="center" className="w-full">
      <Text size="2" color="gray" className="text-center">
        Menampilkan {startItem}-{endItem} dari {totalItems} item
      </Text>
      
      <Flex gap="2" align="center" justify="center" wrap="wrap" className="max-w-full px-2">
        <Button
          variant="outline"
          size="2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{ cursor: currentPage === 1 ? "default" : "pointer" }}
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Sebelumnya</span>
        </Button>

        {/* Desktop / Tablet: Full page numbers */}
        <Flex gap="1" display={{ initial: "none", sm: "flex" }}>
          {getVisiblePages().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "solid" : "outline"}
              size="2"
              disabled={page === "..."}
              onClick={() => typeof page === "number" && onPageChange(page)}
              style={{ minWidth: "38px", cursor: page === "..." ? "default" : "pointer" }}
            >
              {page}
            </Button>
          ))}
        </Flex>

        {/* Mobile: Compact Page Indicator */}
        <Box display={{ initial: "block", sm: "none" }} px="2">
          <Text size="2" weight="bold" color="gray">
            {currentPage} / {totalPages}
          </Text>
        </Box>

        <Button
          variant="outline"
          size="2"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{ cursor: currentPage === totalPages ? "default" : "pointer" }}
          aria-label="Halaman selanjutnya"
        >
          <span className="hidden sm:inline">Selanjutnya</span>
          <ChevronRight size={16} />
        </Button>
      </Flex>
    </Flex>
  );
}