import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation, HashNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CircularProgress from "../../components/CircularProgress"
import { Link,useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
const apiKey = import.meta.env.VITE_API_KEY

// lg:px-24 md:px-10 md:py-1 py-2 px-2
const Home = () => {
  // every section toggle button 
  const [selectedCategory, setSelectedCategory] = useState("movie");  // New state for category
  const [selectedCategoryTopRate, setSelectedCategoryTopRate] = useState( "topRatedMovie"); // New state for category
  const [selectedCategoryUpcoming, setSelectedCategoryUpcoming] = useState( "upcomingMovie"); // New state for category
  // every section toggle button end
 
  const navigate = useNavigate();
  const [popularMovieData, setPopularMovieData] = useState([]);
  const [popularTVData, setPopularTVData] = useState([]);
  const [topRateMovie, setTopRateMovie] = useState ([])
  const [topRateTv, setTopRateTv] = useState ([])
  const [upcomingMovie, setUpcomingMovie] = useState ([])
  const [upcomingTv, setUpcomingTv] = useState ([])


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Fetch data using axios
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`) // Replace with your API URL
      .then((response) => {
        setPopularMovieData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  
    useEffect(() => {
      // Fetch data using axios
      axios
        .get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`) // Replace with your API URL
        .then((response) => {
          setPopularTVData(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      // Fetch data using axios
      axios
        .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`) // Replace with your API URL
        .then((response) => {
          setTopRateMovie(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      // Fetch data using axios
      axios
        .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`) // Replace with your API URL
        .then((response) => {
          setTopRateTv(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);


    // upcoming
    useEffect(() => {
      // Fetch data using axios
      axios
        .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`) // Replace with your API URL
        .then((response) => {
          setUpcomingMovie(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      // Fetch data using axios
      axios
        .get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`) // Replace with your API URL
        .then((response) => {
          setUpcomingTv(response.data.results);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const baseUrl = "https://image.tmdb.org/t/p/w500"; // Example base URL

  const handleNavigation = (item) => {
    const title = item.original_title || item.original_name || "untitled";
    const formattedTitle = title.replace(/\s+/g, '-');
    navigate(`/particular-tv-show/${formattedTitle}`, { state: { data: item } });
  };
  const handleMovieNavigation = (item) => {
    const title = item.original_title || item.original_name || "untitled";
    const formattedTitle = title.replace(/\s+/g, '-');
    navigate(`/particular-movie-show/${formattedTitle}`, { state: { data: item } });
  };

  // 

  return (
    <>
      <div className="banner  ">
        <div className=" bg-cover bg-no-repeat bg-center" style={{  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%), url("./banner.jpg")', }}>
          <div className="lg:px-24 py-28 md:px-16 sm:px-14 px-10  flex flex-col gap-4 ">
            <h2 className='text-white text-4xl'>Welcome...</h2>
            <p className='text-white text-2xl'>Millions of movies, TV shows and people to discover. Explore now.</p>
            <form className="searchbox w-full" >
              <SearchBar/>
            </form>
          </div>
        </div>
      </div>

      <div className="lg:px-24 md:px-10 py-20  px-2">
        <div className="flex gap-5 sm:flex-row flex-col items-center">
          <h2 className=' text-3xl font-semibold'>What's Popular</h2>
          <div className="flex items-center border-[2px] rounded-full ">
            <button className={` font-semibold sm:px-6 px-2 py-1 text-sm rounded-full  ${selectedCategory === "movie" ? "text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]" : "" } `} onClick={() => setSelectedCategory("movie")}>Movie</button>
            <button className={` font-semibold  sm:px-6 px-2 py-1 text-sm rounded-full  ${selectedCategory === "tv" ? "text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]" : ""}`} onClick={() => setSelectedCategory("tv")}>TV</button>
          </div>
        </div>
        {selectedCategory === "movie" && (
          <div className="w-full mt-5 movie-list">
            <Swiper
              spaceBetween={10}
              hashNavigation={{
                watchState: true,
              }}
              breakpoints={{
                320:{
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
                1279: {
                  slidesPerView: 7.2,
                  spaceBetween: 15,
                },
              }}
              navigation={true}
              modules={[Navigation, HashNavigation]}
              className="Popular"
            >
              {popularMovieData.map((item,index) => (
                <SwiperSlide key={index} data-hash="slide1">
                <div key={item.id} 
                  className="w-full relative mb-5 group/box" 
                  onClick={() => handleMovieNavigation(item)}>
                  <div className="image rounded-lg shadow-md w-full  bg-gray-300 overflow-hidden">
                    <Link  className=' w-full h-full inline-block'>
                      <img src={`${baseUrl}${item.poster_path}`} className=' w-full inline-block  h-full group-hover/box:scale-[1.08] aspect-[2/3] transition-all duration-300  ' alt={item.title} />
                    </Link>
                  </div>
                  <div className="w-full relative whitespace-normal flex content-start flex-wrap pt-[26px] pr-[10px] pl-[12px] pb-0 ">
                    <span className='w-11 h-11 absolute -top-7 left-2 bg-black p-[1px] rounded-full '>
                      <CircularProgress percentage={item.vote_average.toFixed(1)*10} />
                    </span>
                    <h2 className='text-base m-0 w-full break-words font-bold text-black group-hover/box:text-[#e60000] '>
                      <Link>{item.title}</Link>
                    </h2>
                    <h2 className='text-sm m-0 p-0 text-black/60'>{item.release_date}</h2>
                  </div>
                </div>
              </SwiperSlide>
              ))}   
            </Swiper>
        </div>
        )}

        {selectedCategory === "tv" &&(
        <div className="w-full mt-5 tv-list">
          <Swiper
            spaceBetween={10}
            hashNavigation={{
              watchState: true,
            }}
            breakpoints={{
              320:{
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1279: {
                slidesPerView: 7.2,
                spaceBetween: 15,
              },
            }}
            navigation={true}
            modules={[Navigation, HashNavigation]}
            className="Popular"
          >
            {popularTVData.map((item,index) => (
              <SwiperSlide key={index} data-hash="slide1">
              <div key={item.id} 
                  className="w-full relative mb-5 group/box" 
                  onClick={() => handleNavigation(item)}>
                <div className="image rounded-lg shadow-md w-full  bg-gray-300 overflow-hidden">
                  <Link  className=' w-full h-full inline-block'>
                    <img src={`${baseUrl}${item.poster_path}`} className=' w-full inline-block  h-full group-hover/box:scale-[1.08] aspect-[2/3] transition-all duration-300 ' alt={item.original_name} />
                  </Link>
                </div>
                <div className="w-full relative whitespace-normal flex content-start flex-wrap pt-[26px] pr-[10px] pl-[12px] pb-0 ">
                  <span className='w-11 h-11 absolute -top-7 left-2 bg-black p-[1px] rounded-full '>
                    <CircularProgress percentage={item.vote_average.toFixed(1)*10} />
                  </span>
                  <h2 className='text-base m-0 w-full break-words font-bold text-black group-hover/box:text-[#e60000] '>
                    <Link>{item.original_name}</Link>
                  </h2>
                  <h2 className='text-sm m-0 p-0 text-black/60'>{item.first_air_date}</h2>
                </div>
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
        )}
      </div>

      <div className="lg:px-24 md:px-10 py-20 pt-0  px-2">
        <div className="flex gap-5 sm:flex-row flex-col items-center">
          <h2 className=' text-3xl font-semibold'>Top Rated</h2>
          <div className="flex items-center border-[2px] rounded-full ">
            <button className={` font-semibold sm:px-6 px-2 py-1 text-sm rounded-full  ${selectedCategoryTopRate === "topRatedMovie" ? "text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]" : "" } `} onClick={() => setSelectedCategoryTopRate("topRatedMovie")}>Movie</button>
            <button className={` font-semibold  sm:px-6 px-2 py-1 text-sm rounded-full  ${selectedCategoryTopRate === "topRatedTv" ? "text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]" : ""}`} onClick={() => setSelectedCategoryTopRate("topRatedTv")}>TV</button>
          </div>
        </div>
        {selectedCategoryTopRate === "topRatedMovie" && (
          <div className="w-full mt-5 movie-list">
            <Swiper
              spaceBetween={10}
              hashNavigation={{
                watchState: true,
              }}
              breakpoints={{
                320:{
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
                1279: {
                  slidesPerView: 7.2,
                  spaceBetween: 15,
                },
              }}
              navigation={true}
              modules={[Navigation, HashNavigation]}
              className="Popular"
            >
              {topRateMovie.map((item,index) => (
                <SwiperSlide key={index} data-hash="slide1">
                <div key={item.id} 
                  className="w-full relative mb-5 group/box" 
                  onClick={() => handleMovieNavigation(item)}>
                  <div className="image rounded-lg shadow-md w-full  bg-gray-300 overflow-hidden">
                    <Link  className=' w-full h-full inline-block'>
                      <img src={`${baseUrl}${item.poster_path}`} className=' w-full inline-block  h-full group-hover/box:scale-[1.08] aspect-[2/3] transition-all duration-300  ' alt={item.original_title} />
                    </Link>
                  </div>
                  <div className="w-full relative whitespace-normal flex content-start flex-wrap pt-[26px] pr-[10px] pl-[12px] pb-0 ">
                    <span className='w-11 h-11 absolute -top-7 left-2 bg-black p-[1px] rounded-full '>
                      <CircularProgress percentage={item.vote_average.toFixed(1)*10} />
                    </span>
                    <h2 className='text-base m-0 w-full break-words font-bold text-black group-hover/box:text-[#e60000] '>
                      <Link>{item.original_title}</Link>
                    </h2>
                    <h2 className='text-sm m-0 p-0 text-black/60'>{item.release_date}</h2>
                  </div>
                </div>
              </SwiperSlide>
              ))}   
            </Swiper>
        </div>
        )}

        {selectedCategoryTopRate === "topRatedTv" &&(
        <div className="w-full mt-5 tv-list">
          <Swiper
            spaceBetween={10}
            hashNavigation={{
              watchState: true,
            }}
            breakpoints={{
              320:{
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1279: {
                slidesPerView: 7.2,
                spaceBetween: 15,
              },
            }}
            navigation={true}
            modules={[Navigation, HashNavigation]}
            className="Popular"
          >
            {topRateTv.map((item,index) => (
              <SwiperSlide key={index} data-hash="slide1">
              <div key={item.id} 
                  className="w-full relative mb-5 group/box" 
                  onClick={() => handleNavigation(item)}>
                <div className="image rounded-lg shadow-md w-full  bg-gray-300 overflow-hidden">
                  <Link  className=' w-full h-full inline-block'>
                    <img src={`${baseUrl}${item.poster_path}`} className=' w-full inline-block  h-full group-hover/box:scale-[1.08] aspect-[2/3] transition-all duration-300 ' alt={item.title} />
                  </Link>
                </div>
                <div className="w-full relative whitespace-normal flex content-start flex-wrap pt-[26px] pr-[10px] pl-[12px] pb-0 ">
                  <span className='w-11 h-11 absolute -top-7 left-2 bg-black p-[1px] rounded-full '>
                    <CircularProgress percentage={item.vote_average.toFixed(1)*10} />
                  </span>
                  <h2 className='text-base m-0 w-full break-words font-bold text-black group-hover/box:text-[#e60000] '>
                    <Link>{item.original_name}</Link>
                  </h2>
                  <h2 className='text-sm m-0 p-0 text-black/60'>{item.first_air_date}</h2>
                </div>
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
        )}
      </div>

      <div className="lg:px-24 md:px-10 py-20 pt-0  px-2">
        <div className="flex gap-5 sm:flex-row flex-col items-center">
          <h2 className=' text-3xl font-semibold'>Upcoming Show</h2>
          <div className="flex items-center border-[2px] rounded-full ">
            <button className={` font-semibold sm:px-6 px-2 py-1 text-sm rounded-full  ${selectedCategoryUpcoming === "upcomingMovie" ? "text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]" : "" } `} onClick={() => setSelectedCategoryUpcoming("upcomingMovie")}>Movie</button>
            <button className={` font-semibold  sm:px-6 px-2 py-1 text-sm rounded-full  ${selectedCategoryUpcoming === "upcomingTv" ? "text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00]" : ""}`} onClick={() => setSelectedCategoryUpcoming("upcomingTv")}>TV</button>
          </div>
        </div>
        {selectedCategoryUpcoming === "upcomingMovie" && (
          <div className="w-full mt-5 movie-list">
            <Swiper
              spaceBetween={10}
              hashNavigation={{
                watchState: true,
              }}
              breakpoints={{
                320:{
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 15,
                },
                1279: {
                  slidesPerView: 7.2,
                  spaceBetween: 15,
                },
              }}
              navigation={true}
              modules={[Navigation, HashNavigation]}
              className="Popular"
            >
              {upcomingMovie.map((item,index) => (
                <SwiperSlide key={index} data-hash="slide1">
                <div key={item.id} 
                  className="w-full relative mb-5 group/box" 
                  onClick={() => handleMovieNavigation(item)}>
                  <div className="image rounded-lg shadow-md w-full  bg-gray-300 overflow-hidden">
                    <Link  className=' w-full h-full inline-block'>
                      <img src={`${baseUrl}${item.poster_path}`} className=' w-full inline-block  h-full group-hover/box:scale-[1.08] aspect-[2/3] transition-all duration-300  ' alt={item.original_title} />
                    </Link>
                  </div>
                  <div className="w-full relative whitespace-normal flex content-start flex-wrap pt-[26px] pr-[10px] pl-[12px] pb-0 ">
                    <span className='w-11 h-11 absolute -top-7 left-2 bg-black p-[1px] rounded-full '>
                      <CircularProgress percentage={item.vote_average.toFixed(1)*10} />
                    </span>
                    <h2 className='text-base m-0 w-full break-words font-bold text-black group-hover/box:text-[#e60000] '>
                      <Link>{item.original_title}</Link>
                    </h2>
                    <h2 className='text-sm m-0 p-0 text-black/60'>{item.release_date}</h2>
                  </div>
                </div>
              </SwiperSlide>
              ))}   
            </Swiper>
        </div>
        )}

        {selectedCategoryUpcoming === "upcomingTv" &&(
        <div className="w-full mt-5 tv-list">
          <Swiper
            spaceBetween={10}
            hashNavigation={{
              watchState: true,
            }}
            breakpoints={{
              320:{
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1279: {
                slidesPerView: 7.2,
                spaceBetween: 15,
              },
            }}
            navigation={true}
            modules={[Navigation, HashNavigation]}
            className="Popular"
          >
            {upcomingTv.map((item,index) => (
              <SwiperSlide key={index} data-hash="slide1">
              <div key={item.id} 
                  className="w-full relative mb-5 group/box" 
                  onClick={() => handleNavigation(item)}>
                <div className="image rounded-lg shadow-md w-full  bg-gray-300 overflow-hidden">
                  <Link  className=' w-full h-full inline-block'>
                    <img src={`${baseUrl}${item.poster_path}`} className=' w-full inline-block  h-full group-hover/box:scale-[1.08] aspect-[2/3] transition-all duration-300 ' alt={item.title} />
                  </Link>
                </div>
                <div className="w-full relative whitespace-normal flex content-start flex-wrap pt-[26px] pr-[10px] pl-[12px] pb-0 ">
                  <span className='w-11 h-11 absolute -top-7 left-2 bg-black p-[1px] rounded-full '>
                    <CircularProgress percentage={item.vote_average.toFixed(1)*10} />
                  </span>
                  <h2 className='text-base m-0 w-full break-words font-bold text-black group-hover/box:text-[#e60000] '>
                    <Link>{item.original_name}</Link>
                  </h2>
                  <h2 className='text-sm m-0 p-0 text-black/60'>{item.first_air_date}</h2>
                </div>
              </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
        )}
      </div>
    </>
  )
}

export default Home