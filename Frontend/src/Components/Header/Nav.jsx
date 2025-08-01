import React, { useState } from 'react'
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../public/logo.png'

import { logoutUser } from '../../Services/authService'
import { useMutation } from '@tanstack/react-query'
import { useFetchCurrentUser } from '../../hooks/useFetchCurrentUser';
import { useQueryClient } from '@tanstack/react-query'
function Nav() {

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [menuBar, setMenuBar] = useState(false)


  const { data: userData, isLoading, isError } = useFetchCurrentUser();

  const isLoggedIn = !!userData;
  const user = userData?.data?.user

  const logoutUserMutation = useMutation({
    mutationFn: async () => {
      const data = await logoutUser()
      return data
    },

    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(["currentUser"], null)

    },

    onError: (error) => {
      throw new Error(error)
    }
  })

  const toggleMenuBar = () => {
    setMenuBar(prev => !prev)
  }
  const NavList = [
    {
      name: 'Home',
      to: '/home',
      active: true
    },
    {
      name: 'About',
      to: '/about',
      active: true
    },
    {
      name: 'Contact',
      to: '/contact',
      active: true
    },
    {
      name: 'Agents',
      to: '/agents',
      active: true
    },
    {
      name: 'Profile',
      active: true,
      to: '/user/profile',
      auth: isLoggedIn
    },
  ]

  return (
    <>
      <div className='w-full relative z-99 h-20 flex  justify-between px-5 md:px-0'>
        <div className="left flex items-center gap-14">
          <div>
            <Link to={"/"} className='text-4xl font-bold flex items-baseline gap-2 '> <img src={logo} alt="logo" className='inline-block w-8 md:w-14 lg:w-8 ' /> <h1 className='hidden font-semibold text-2xl lg:block '>Brikly</h1></Link>
          </div>

          <div className='hidden md:flex gap-10'>
            {
              NavList.map((nav) => (
                nav.name !== "Profile" && <NavLink to={nav.to} key={nav.name} className={({ isActive }) => `text-base hover:scale-105 transition-all duration-300 ease-in-out ${(isActive ? "text-red-700" : "text-black")}`}>{nav.name}</NavLink>
              ))
            }
          </div>


        </div>

        <div className="right md:w-[40%] h-full  lg:bg-[#fcf5f3] text-white text-end py-6">
          <div className='md:hidden '>
            <div>
              <TiThMenu onClick={toggleMenuBar} className='text-3xl z-999 bg-black w-10 h-10 rounded-full p-2' />
            </div>
            <div className={`w-1/2 h-screen absolute z-[999] flex flex-col gap-5 items-start top-0 p-5 bg-black text-white text-2xl transition-all duration-500 ease-in-out ${menuBar ? "-right-5" : "-right-[100%]"}`}>
              <div className='flex flex-col gap-5'>
                <div className='absolute top-7 right-5 text-3xl ' onClick={toggleMenuBar}><RxCross2 /></div>
                {
                  NavList.map((nav) => (
                    nav.name !== "Profile" && <Link key={nav.name} to={nav.to} className='flex'>{nav.name}</Link>
                  ))
                }
              </div>
              <div>
                {
                  !isLoggedIn ? <div className='flex flex-col gap-5 items-start justify-end text-2xl text-white'>
                    <Link to={'/login'}>Sign in</Link>
                    <Link to={'/signup'}>Sign up</Link>
                  </div>
                    :
                    <div >
                      {
                        NavList.map((nav) => nav.auth &&
                          <div key={nav.name} className='flex flex-col gap-5 items-start justify-end text-2xl text-white'>
                            <div className='flex items-center gap-2'>
                              <img src={user ? user?.avatar?.url : "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"} alt="" className='w-7 h-7 rounded-full' />
                              <h1 className='text-base font-semibold'>{user?.fullname}</h1>
                            </div>
                            <NavLink to={nav.to} key={nav.name} >{nav.name}</NavLink>
                            <button className="bg-transparent" onClick={() => logoutUserMutation.mutate()}>Logout</button>
                          </div>
                        )
                      }
                    </div>
                }
              </div>
            </div>
          </div>


          {
            !isLoggedIn ? <div className='hidden md:flex gap-5 justify-end text-base text-black lg:pr-5'>
              <button><Link to={'/login'}>Sign in</Link></button>
              <button className='bg-orange-300 p-1 rounded'><Link to={'/signup'}>Sign up</Link></button>
            </div>
              :
              <div >
                {
                  NavList.map((nav) => nav.auth &&
                    <div key={nav.name} className='hidden md:flex gap-5 items-center justify-end text-base text-black lg:pr-5'>
                      <div className='flex items-center gap-2'>
                        <img src={user ? user?.avatar?.url : "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"} alt="" className='w-9 h-9 rounded-full object-cover' />
                        <h1 className='text-base font-semibold'>{user?.fullname}</h1>
                      </div>
                      <NavLink to={nav.to} key={nav.name} >{nav.name}</NavLink>
                      <button className="p-1 bg-orange-300 rounded" onClick={() => logoutUserMutation.mutate()}>Logout</button>
                    </div>
                  )
                }
              </div>
          }
          <div >

          </div>
        </div>
      </div>
    </>
  )
}

export default Nav