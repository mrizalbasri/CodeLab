"use client";

import { useState, useMemo } from "react";
import { trackSearch } from "@/lib/analytics";

interface UseSearchAndPaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  searchFields: (keyof T)[];
  analyticsSection?: string;
}

export function useSearchAndPagination<T>({
  data,
  itemsPerPage = 6,
  searchFields,
  analyticsSection = "Unknown",
}: UseSearchAndPaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data berdasarkan search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  }, [data, searchQuery, searchFields]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    
    // Track search analytics
    if (query.trim()) {
      trackSearch(query, analyticsSection);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    // Data
    paginatedData,
    filteredData,
    totalItems: filteredData.length,
    
    // Search
    searchQuery,
    handleSearch,
    handleClearSearch,
    
    // Pagination
    currentPage,
    totalPages,
    handlePageChange,
    itemsPerPage,
  };
}