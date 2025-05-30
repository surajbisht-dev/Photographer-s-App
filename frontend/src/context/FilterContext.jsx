import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 6,
    sortBy: "",
    priceRange: [0, 100000],
    rating: 0,
    styles: [],
    city: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // Reset page to 1 on filter change except for 'page' itself
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const loadMore = () => {
    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, loadMore }}>
      {children}
    </FilterContext.Provider>
  );
}
