import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '../../components/CircularProgress';
import axios from 'axios';
import { Pagination } from 'antd';
import SmollSearchBar from '../../components/SmollSearchBar';

 
const apiKey = import.meta.env.VITE_API_KEY;

const PopularTv = () => {

    const navigate = useNavigate();
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allTvs, setAllTvs] = useState([]); // All Tvs fetched from the API
    const [filteredTvs, setFilteredTvs] = useState([]); // Filtered Tvs based on genre
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [genreData, setGenreData] = useState([]);
  
    const fetchAllTvs = async () => {
      setLoading(true);
      try {
        let Tvs = [];
        for (let page = 1; page <= 50; page++) { // Fetch first 5 pages for a broader dataset
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=${page}`
          );
          Tvs = [...Tvs, ...response.data.results];
        }
        setAllTvs(Tvs);
        setFilteredTvs(Tvs); // Initially, show all Tvs
        setTotalResults(Tvs.length);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchAllTvs();
    }, []);
  
    useEffect(() => {
      axios
        .get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`)
        .then((response) => {
          setGenreData(response.data.genres);
        })
        .catch((error) => {
          setError(error.message);
        });
    }, []);
  
    // Filter Tvs whenever the selected genre changes
    useEffect(() => {
      if (selectedGenreId) {
        const filtered = allTvs.filter((movie) =>
          movie.genre_ids.includes(selectedGenreId)
        );
        setFilteredTvs(filtered);
        setTotalResults(filtered.length); // Update total results for pagination
      } else {
        setFilteredTvs(allTvs); // Reset to all Tvs if no genre is selected
        setTotalResults(allTvs.length);
      }
      setCurrentPage(1); // Reset to the first page after applying filters
    }, [selectedGenreId, allTvs]);
  
    const TvsToDisplay = filteredTvs.slice(
      (currentPage - 1) * 20,
      currentPage * 20
    );
  
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    
    const handleNavigation = (item) => {
      const formattedTitle = item.original_name?.replace(/\s+/g, '-') || 'unknown-show';
      navigate(`/particular-tv-show/${formattedTitle}`, { state: { data: item } });
    };
  
    if (error) return <p>Error: {error}</p>;
  return (
    <>
        <div className="lg:px-24 md:px-10 py-10 px-2">
          <div className="flex md:flex-row flex-col gap-4 items-stretch">
            <div className="md:w-1/4 md:sticky md:top-[7.4rem] h-full">
              <h2 className="font-medium text-3xl mb-5">Top Rated</h2>
              <div className="border rounded p-3">
                <div className="searchbox w-full">
                  <SmollSearchBar/>
                  <div>
                    <h3 className="font-medium text-xl my-3 border-b pb-2">Genres</h3>
                    <div className="py-2">
                      <div className="flex flex-wrap gap-2">
                        {genreData.map((item) => (
                          <button
                            key={item.id}
                            className={`px-3 py-1 text-xs border rounded-full transition-all duration-300 ${
                              selectedGenreId === item.id
                                ? 'bg-gradient-to-r from-[#1F1C18] to-[#8E0E00] text-white'
                                : 'hover:bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]'
                            }`}
                            onClick={() =>
                              setSelectedGenreId(
                                item.id === selectedGenreId ? null : item.id
                              )
                            }
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/4 border bg-white p-3 md:mt-20">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="loader"> </div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-2 gap-3">
                  {TvsToDisplay.map((item) => (
                    <div key={item.id} className="w-full relative mb-5 group/box" onClick={() => handleNavigation(item)}>
                      <div className="image rounded-lg shadow-md w-full bg-gray-300 overflow-hidden">
                        <Link>
                          <img src={`${baseUrl}${item.poster_path}`} className="w-full h-full group-hover/box:scale-105 transition-all duration-300" alt={item.original_title}/>
                        </Link>
                      </div>
                      <div className="w-full relative flex flex-wrap pt-5 pl-3">
                        <span className="w-11 h-11 absolute -top-7 left-2 bg-black p-1 rounded-full multi">
                          <CircularProgress percentage={item.vote_average.toFixed(1) * 10} />
                        </span>
                        <h2 className="text-sm font-medium text-black group-hover/box:text-[#e60000]">
                          <Link>{item.original_name}</Link>
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="pt-5 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={totalResults}
                  pageSize={20}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default PopularTv