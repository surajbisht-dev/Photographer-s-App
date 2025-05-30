// src/components/SkeletonLoader.jsx
import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-2 p-4 border rounded-md shadow">
      <div className="bg-gray-300 h-48 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
      <div className="flex space-x-1 mt-3">
        <div className="h-5 w-10 bg-gray-300 rounded-full"></div>
        <div className="h-5 w-10 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded mt-4"></div>
    </div>
  );
}
