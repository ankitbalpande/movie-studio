import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 

import { FaPlay } from 'react-icons/fa';
import CircularProgress from '../../components/CircularProgress';

const ParticularMovieShow = () => {
    const location = useLocation();
    const { data } = location.state || {}; // Get the data passed via navigate
    const [movieDetails, setMovieDetails] = useState(null);
    const baseUrl = "https://image.tmdb.org/t/p/w500";

    // Fetch movie details based on ID
    useEffect(() => {
        if (data && data.id) {
            const fetchMovieDetails = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${data.id}?api_key=4ed3273ce23e349d820debb7786d3ac5`);
                    console.log(`https://api.themoviedb.org/3/movie/${data.id}?api_key=4ed3273ce23e349d820debb7786d3ac5`)
                    const result = await response.json();
                    setMovieDetails(result);
                } catch (error) {
                    console.error('Error fetching movie details:', error);
                }
            };
            fetchMovieDetails();
        }
    }, [data]);

    if (!movieDetails) return <p>Loading movie data...</p>;
    if (!data) return <p>No movie data available</p>;

    return (
        <>
            <div className='bg-no-repeat bg-current bg-cover bg-right' style={{ backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 85%) 32%, #471b1bc2 100%), url(${baseUrl}${movieDetails.backdrop_path})` }}>
                <div className="lg:px-24 md:px-10 py-10 px-2">
                    <div className="py-8">
                        <div className="flex sm:flex-row flex-col justify-center gap-5">
                            <div className="sm:w-96 w-full px-2"><img src={`${baseUrl}${movieDetails.poster_path}`} alt={movieDetails.title} /></div>
                            <div className="sm:w-[calc(100%_-_384px)]  w-full  p-5 text-white">
                                <div className="flex flex-col gap-2">
                                    <h1 className='text-4xl font-bold'>
                                        {movieDetails.original_title || movieDetails.original_name} 
                                        <span className="font-normal">(<span>{movieDetails.release_date?.split('-')[0] || movieDetails.first_air_date?.split('-')[0]}</span>)</span>
                                    </h1>
                                        <div className="flex gap-3 flex-row flex-wrap">
                                            <p>{movieDetails.release_date ? movieDetails.release_date.split('-').reverse().join('/') : movieDetails.first_air_date ? movieDetails.first_air_date.split('-').reverse().join('/') : 'N/A'}</p>
                                            <div className="flex gap-2 items-center">
                                                <span className='w-1 h-1 rounded-full block bg-white'></span>
                                                {movieDetails.genres.map((item, index) => (
                                                    <span key={index}> <span>{item.name}</span></span>
                                                ))}
                                                {/* <span>{movieDetails.runtime}</span> */}
                                            </div>
                                        </div>
                                    <p className='text-lg font-semibold'>Language : <span className="uppercase font-normal text-sm">{movieDetails.original_language}</span></p>
                                    <div className="w-full flex flex-wrap items-center gap-3 pt-2">
                                        <span className="w-14 h-14 bg-black p-1 rounded-full transition-all duration-300 scale-[1] hover:scale-[1.1]">
                                            <CircularProgress percentage={movieDetails.vote_average.toFixed(1) * 10} />
                                        </span>
                                        <p className='text-lg font-semibold'>User Score</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p className=' italic font-semibold opacity-55'>{movieDetails.tagline}</p>
                                    </div>
                                    <div className="pt-3">
                                        <p className='text-lg font-semibold pb-2'>Overview</p>
                                        <span>{movieDetails.overview}</span>
                                    </div>
                                    <div className="flex pt-3 w-16 transition-all duration-300 scale-[1] hover:scale-[1.1"> 
                                        <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`} ><img src="/imdb.png" className='w-full hover:shadow-2xl' alt={movieDetails.imdb_id} /></a>
                                    </div>
                                    <div className="">
                                        {movieDetails.homepage ? <a href={movieDetails.homepage}>Home page : {movieDetails.homepage} </a> : " "}
                                    </div>
                                    <div className="mt-4">
                                        <button className='flex gap-2 items-center text-white bg-gradient-to-r from-[#1F1C18] to-[#8E0E00] sm:px-6 px-2 py-2 text-base rounded-full active:bg-gradient-to-r active:from-[#8E0E00] active:to-[#1F1C18] transition-all duration-300 scale-[1] hover:scale-[1.1] border border-white'>
                                            <FaPlay /> Play Trailer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default ParticularMovieShow;
