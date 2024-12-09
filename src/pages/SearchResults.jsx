import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { query, results } = location.state || {}; // Get data from navigate state

  if (!results || results.length === 0) {
    return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">No results found</h2>
        <p>We couldn't find any results for "{query}". Try another search!</p>
      </div>
    );
  }

  return ( 
    <div className="results-container p-6">
        <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="movie-card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title || movie.original_title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{movie.title || movie.original_title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Release Date: {movie.release_date || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Rating: {movie.vote_average ? `${movie.vote_average}/10` : "N/A"}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
