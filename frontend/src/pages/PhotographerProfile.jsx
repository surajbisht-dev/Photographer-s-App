import React, { useEffect, useState } from "react";

export default function PhotographerProfile({ photographerId, onBack }) {
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotographer() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3001/photographers/${photographerId}`
        );
        if (!res.ok) throw new Error("Failed to fetch photographer data");
        const data = await res.json();
        setPhotographer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (photographerId) {
      fetchPhotographer();
    }
  }, [photographerId]);

  if (loading)
    return <p className="p-6 text-center text-lg">Loading profile...</p>;

  if (error) return <p className="p-6 text-center text-red-600">{error}</p>;

  if (!photographer)
    return <p className="p-6 text-center text-lg">No profile found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded shadow-lg">
      <button
        onClick={onBack}
        className="mb-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        &larr; Back to listing
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={photographer.profilePicture || "/default-profile.png"}
            alt={photographer.name}
            className="w-56 h-56 object-cover rounded-full border-4 border-gray-200"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-extrabold">{photographer.name}</h2>
          <p className="text-gray-600 text-lg">{photographer.location}</p>

          {photographer.bio && (
            <div>
              <h3 className="text-xl font-semibold mb-1">Biography</h3>
              <p className="text-gray-700">{photographer.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
            <div>
              <h3 className="text-lg font-semibold">Pricing</h3>
              <p>${photographer.price} per session</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Rating</h3>
              <p>{photographer.rating} / 5</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Experience</h3>
              <p>
                {photographer.experience
                  ? `${photographer.experience} years`
                  : "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <p>{photographer.contact || "N/A"}</p>
            </div>
          </div>

          {photographer.tags && photographer.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Tags</h3>
              <p>{photographer.tags.join(", ")}</p>
            </div>
          )}

          {photographer.portfolio && (
            <div>
              <h3 className="text-lg font-semibold">Portfolio</h3>
              <a
                href={photographer.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                View Portfolio
              </a>
            </div>
          )}

          {photographer.socials &&
            Object.keys(photographer.socials).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold">Social Media</h3>
                <ul className="list-disc list-inside">
                  {Object.entries(photographer.socials).map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
