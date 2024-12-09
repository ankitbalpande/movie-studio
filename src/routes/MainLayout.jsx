import React from 'react'
import Header from '../components/Header'
import Pages from '../pages/Pages'

const MainLayout = () => {
  return (
    <>
        <Header/>
        <div className=" pt-[56.03px] ">
          <Pages />
        </div>
    </>
  )
}

export default MainLayout