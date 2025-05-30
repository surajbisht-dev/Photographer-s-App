// src/components/SortDropdown.jsx
import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

export default function SortDropdown() {
  const { filters, updateFilter } = useContext(FilterContext);

  return (
    <select
      value={filters.sortBy}
      onChange={(e) => updateFilter("sortBy", e.target.value)}
      className="border p-1 rounded"
    >
      <option value="recent">Recently Added</option>
      <option value="priceLowToHigh">Price: Low to High</option>
      <option value="ratingHighToLow">Rating: High to Low</option>
    </select>
  );
}
