import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';


const MainLayout = React.lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./MainLayout')), 2100)
  )
);

const Index = () => {
  return ( 
    <>
      <Suspense fallback={
        <div className='w-full h-[100vh] bg-primary flex justify-center items-center'>
          <img src="/movie-studio-gif.gif" alt="movie studio" />
        </div>
        }>
        <Routes>
              <Route path="/*" element={<MainLayout/>} />
          </Routes>
      </Suspense>
    </>
  )
}

export default Index