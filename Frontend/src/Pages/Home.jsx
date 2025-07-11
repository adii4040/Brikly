import React from 'react'
import bg from '../../public/bg.png'
import SearchBar from '../Components/SearchBar'

function Home() {
  return (
    <>
      <div className='w-full h-contentheight flex px-5 md:px-0 '>
        <div className="left w-full flex lg:w-[60%] ">
          <div className='w-full lg:w-[90%] lg:pr-10 lg:pt-20 flex flex-col md:mt-[20%] lg:mt-[5%] md:gap-5'>
            <h1 className='text-4xl md:text-5xl font-semibold '>
              Building Dreams, One Brick at a Time.
            </h1>

            <p className='text-sm my-5'>Brikly is your gateway to premium real estate. From modern apartments to luxury villas, we bring you verified listings, smart filters, and a seamless experience — all designed to help you find your perfect home, faster and smarter.
            </p>

            <SearchBar/>

            <div className='hidden md:flex justify-between'>
              <div>
                <h1 className='text-3xl font-semibold'>16+</h1>
                <p className='text-gray-800 font-light'>Years of Experience</p>
              </div>
              <div>
                <h1 className='text-3xl font-semibold'>200</h1>
                <p className='text-gray-800 font-light'>Award Gained</p>
              </div>
              <div>
                <h1 className='text-3xl font-semibold'>2000+</h1>
                <p className='text-gray-800 font-light'>Property Ready</p>
              </div>

            </div>
          </div>
        </div>
        <div className="right lg:w-[40%] h-full relative bg-[#fcf5f3] overflow">
          <div className='w-[120%] absolute right-0'>
            <img src={bg} alt="brand" className='w-full' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home