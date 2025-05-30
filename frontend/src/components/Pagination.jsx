// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ onLoadMore, hasMore }) {
  if (!hasMore) return null;
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onLoadMore}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
      >
        Load More
      </button>
    </div>
  );
}
