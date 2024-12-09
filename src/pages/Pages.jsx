import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import PopularMovie from './Movie/PopularMovie'
import TopRated from './Movie/TopRated'
import UpcomingMovie from './Movie/UpcomingMovie'
import PopularTv from './TV/PopularTv'
import TopRatedTv from './TV/TopRatedTv'
import UpcomingTv from './TV/UpcomingTv'
import ParticularMovieShow from './Movie/ParticularMovieShow'
import ParticularTvShow from './TV/ParticularTvShow'
import SearchResults from './SearchResults'
import SearchBar from '../components/SearchBar'

const Pages = () => {
  const allPages = [
    {
      pagePath:'/',
      pageElement:<Home/>,
    },
    // movie
    {
      pagePath:'/popular',
      pageElement:<PopularMovie/>,
    },
    {
      pagePath:'/top-rated',
      pageElement:<TopRated/>,
    },
    {
      pagePath:'/upcoming',
      pageElement:<UpcomingMovie/>,
    },
    // Tv show
    {
      pagePath:'/tv-show-popular',
      pageElement:<PopularTv/>,
    },
    {
      pagePath:'/tv-show-top-rated',
      pageElement:<TopRatedTv/>,
    },
    {
      pagePath:'/trending',
      pageElement:<UpcomingTv/>,
    },
    {
      pagePath:'/particular-tv-show/:name',
      pageElement:<ParticularTvShow/>,
    },
    {
      pagePath:'/particular-movie-show/:name',
      pageElement:<ParticularMovieShow/>,
    },
    {
      pagePath:'/search',
      pageElement:<SearchResults/>,
    },
    {
      pagePath:'/search-bar',
      pageElement:<SearchBar/>,
    },

  ]
  return (
    <>
      <Routes>
        {allPages.map((item,index) => (
          <Route key={index} path={item.pagePath} element={item.pageElement}/>
        ))}
      </Routes>
    </>
  )
}

export default Pages