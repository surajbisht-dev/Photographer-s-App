import React, { useState } from "react";
import { FilterProvider } from "./context/FilterContext";

import CategoryListing from "./pages/CategoryListing";
import PhotographerProfile from "./pages/PhotographerProfile";

export default function App() {
  const [selectedPhotographerId, setSelectedPhotographerId] = useState(null);

  const handleViewProfile = (id) => {
    setSelectedPhotographerId(id);
  };

  const handleBackToListing = () => {
    setSelectedPhotographerId(null);
  };

  return (
    <FilterProvider>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-center text-3xl font-bold py-6">
          Photographers Listing
        </h1>

        {!selectedPhotographerId ? (
          <CategoryListing onViewProfile={handleViewProfile} />
        ) : (
          <PhotographerProfile
            photographerId={selectedPhotographerId}
            onBack={handleBackToListing}
          />
        )}
      </div>
    </FilterProvider>
  );
}
