import React, { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import PhotographerCard from "../components/PhotographerCard";
import SearchBar from "../components/SearchBar";
import FiltersSidebar from "../components/FiltersSidebar";
import SortDropdown from "../components/SortDropdown";
import SkeletonLoader from "../components/SkeletonLoader";
import Pagination from "../components/Pagination";
import PhotographerProfile from "./PhotographerProfile";

export default function CategoryListing() {
  const { filters, loadMore } = useContext(FilterContext);
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPhotographerId, setSelectedPhotographerId] = useState(null);

  // Fetch photographers with filters and pagination
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const params = new URLSearchParams();

      if (filters.search) params.append("q", filters.search);

      params.append("_page", filters.page);
      params.append("_limit", filters.limit);

      if (filters.sortBy === "priceLowToHigh") params.append("_sort", "price");
      else if (filters.sortBy === "ratingHighToLow") {
        params.append("_sort", "rating");
        params.append("_order", "desc");
      } else if (filters.sortBy === "recent") {
        params.append("_sort", "id");
        params.append("_order", "desc");
      }

      try {
        const res = await fetch(
          `http://localhost:3001/photographers?${params.toString()}`
        );
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();

        const searchLower = filters.search.trim().toLowerCase();

        const filtered = data.filter((p) => {
          if (p.price > filters.priceRange[1]) return false;
          if (p.rating < filters.rating) return false;
          if (
            filters.styles.length > 0 &&
            !filters.styles.some((s) => p.tags.includes(s))
          )
            return false;
          if (filters.city && p.location !== filters.city) return false;

          if (searchLower) {
            const matchName = p.name.toLowerCase().includes(searchLower);
            const matchLocation = p.location
              .toLowerCase()
              .includes(searchLower);
            const matchTags = p.tags.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            );
            const matchBio = p.bio.toLowerCase().includes(searchLower);
            if (!(matchName || matchLocation || matchTags || matchBio))
              return false;
          }

          return true;
        });

        if (filters.page === 1) setPhotographers(filtered);
        else setPhotographers((prev) => [...prev, ...filtered]);

        setHasMore(filtered.length === filters.limit);
      } catch (err) {
        console.error("Error fetching photographers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  // Show profile page if a photographer selected
  if (selectedPhotographerId) {
    return (
      <PhotographerProfile
        photographerId={selectedPhotographerId}
        onBack={() => setSelectedPhotographerId(null)}
      />
    );
  }

  return (
    <div className="flex gap-6 p-6">
      <FiltersSidebar />

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <SearchBar />
          <SortDropdown />
        </div>

        {loading && filters.page === 1 ? (
          Array.from({ length: filters.limit }).map((_, i) => (
            <SkeletonLoader key={i} />
          ))
        ) : photographers.length === 0 ? (
          <p>No photographers found matching your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photographers.map((p) => (
              <PhotographerCard
                key={p.id}
                photographer={p}
                onViewProfile={() => setSelectedPhotographerId(p.id)}
              />
            ))}
          </div>
        )}

        <Pagination onLoadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
}
