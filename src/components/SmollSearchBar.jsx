import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


const SmollSearchBar = () => {
    const [query, setQuery] = useState(""); // User input
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Navigation function
  
    const handleSearch = async () => {
      if (query.trim() === "") return; // Prevent empty searches
      setLoading(true); // Start loading
      setError(null); // Reset error
  
      const apiKey = "4ed3273ce23e349d820debb7786d3ac5";
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (response.ok) {
          console.log("Search results:", data.results);
          navigate("/search", { state: { query, results: data.results } }); // Pass results to the results page
        } else {
          console.error("Error fetching search results:", data.status_message);
          setError(data.status_message || "Something went wrong.");
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };
  
    return (
      <div className="relative sm:my-6 my-4">
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full block border py-2 pl-5 rounded-full"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          disabled={loading} // Disable button while loading
          className={`text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00] absolute top-1/2 -translate-y-1/2 right-1 sm:px-6 px-2 py-2 text-lg rounded-full transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? <div className="search-loader"></div> : <> <RiSearchLine  /></>}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display errors if any */}
      </div>
    );
  };
  
export default SmollSearchBar