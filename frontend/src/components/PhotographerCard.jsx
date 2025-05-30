// src/components/PhotographerCard.jsx
import React from "react";

export default function PhotographerCard({ photographer, onViewProfile }) {
  return (
    <div className="border rounded-md p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{photographer.name}</h3>
      <p className="text-sm text-gray-600">{photographer.location}</p>
      <p className="text-sm mt-1">Starting Price: ₹{photographer.price}</p>
      <p className="text-sm mt-1">Rating: {photographer.rating}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {photographer.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => onViewProfile(photographer.id)}
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-1 rounded mt-4"
      >
        View Profile
      </button>
    </div>
  );
}
