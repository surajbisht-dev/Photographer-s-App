import React, { useContext, useState, useEffect } from "react";
import { FilterContext } from "../context/FilterContext";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const { updateFilter } = useContext(FilterContext);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    updateFilter("search", debouncedInput.trim());
  }, [debouncedInput]);

  return (
    <input
      type="text"
      placeholder="Search by name, location or tag..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full p-2 border rounded-md"
    />
  );
}
