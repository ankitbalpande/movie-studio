import React from 'react'
import RoutesIndex from './routes/Index'
import {BrowserRouter} from "react-router-dom"

const App = () => {
  return (
    <>
      <BrowserRouter>
          <RoutesIndex/>
      </BrowserRouter>
    </>
  )
}

export default App