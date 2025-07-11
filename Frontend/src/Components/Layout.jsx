import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Header/Nav'
function Layout() {
  return (
    <>
    <div className=' md:w-[75%] lg:w-[95%] xl:w-[70%] h-screen mx-auto'>
      <div>
        <Nav/>
      </div>

      <div>
        <Outlet/>
      </div>
    </div>
    </>
  )
}

export default Layout