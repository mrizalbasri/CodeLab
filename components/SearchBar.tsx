"use client";

import { TextField, Button, Flex } from "@radix-ui/themes";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Cari...", 
  onSearch, 
  onClear,
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onClear?.();
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <Flex gap="2" align="center">
        <TextField.Root
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1 }}
        >
          <TextField.Slot>
            <Search size={16} />
          </TextField.Slot>
          {query && (
            <TextField.Slot>
              <Button
                type="button"
                variant="ghost"
                size="1"
                onClick={handleClear}
              >
                <X size={14} />
              </Button>
            </TextField.Slot>
          )}
        </TextField.Root>
        <Button type="submit" variant="solid">
          Cari
        </Button>
      </Flex>
    </form>
  );
}