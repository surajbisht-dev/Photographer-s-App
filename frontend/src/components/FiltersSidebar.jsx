import React, { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

const STYLES = [
  "Maternity",
  "Candid",
  "Wedding",
  "Couple",
  "Birthday",
  "Family",
  "Newborn",
  "Pre-wedding",
];
const CITIES = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

export default function FiltersSidebar() {
  const { filters, updateFilter } = useContext(FilterContext);

  const handlePriceChange = (e) => {
    const maxPrice = Number(e.target.value);
    updateFilter("priceRange", [0, maxPrice]);
  };

  const toggleStyle = (style) => {
    let updated = [...filters.styles];
    if (updated.includes(style)) {
      updated = updated.filter((s) => s !== style);
    } else {
      updated.push(style);
    }
    updateFilter("styles", updated);
  };

  return (
    <div className="p-4 border rounded-md space-y-6 w-64">
      <div>
        <label className="font-semibold">
          Max Price: ₹{filters.priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
      </div>

      <div>
        <label className="font-semibold block mb-2">Minimum Rating</label>
        {[4, 3, 2, 1].map((r) => (
          <label key={r} className="block cursor-pointer">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === r}
              onChange={() => updateFilter("rating", r)}
              className="mr-2"
            />
            {r}+ Stars
          </label>
        ))}
        <label className="block cursor-pointer">
          <input
            type="radio"
            name="rating"
            checked={filters.rating === 0}
            onChange={() => updateFilter("rating", 0)}
            className="mr-2"
          />
          All Ratings
        </label>
      </div>
      <div>
        <label className="font-semibold block mb-2">Styles</label>
        {STYLES.map((style) => (
          <label key={style} className="block cursor-pointer">
            <input
              type="checkbox"
              checked={filters.styles.includes(style)}
              onChange={() => toggleStyle(style)}
              className="mr-2"
            />
            {style}
          </label>
        ))}
      </div>
      <div>
        <label className="font-semibold block mb-2">City</label>
        <select
          value={filters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="w-full border rounded p-1"
        >
          <option value="">All Cities</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
