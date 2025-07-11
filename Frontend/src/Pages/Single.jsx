import React, { useState } from 'react'

import SinglePageRight from '../Components/SinglePageRight'
import pin from '../../public/pin.png'

function Single() {

  const [imgSrc, setImgSrc] = useState([
    "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ])

  //console.log("OUTSIDE",imgSrc)
  const swapImg = (src) => {
    const newImgSrc = [...imgSrc]
    const index = newImgSrc.indexOf(src)
    newImgSrc[0] = newImgSrc[index]
    newImgSrc[index] = imgSrc[0]
    setImgSrc(newImgSrc)
    //console.log("Inside",imgSrc)
  }
  return (
    <div className='w-full h-contentheight flex flex-col gap-10 md:gap-0  lg:flex-row overflow-y-scroll lg:overflow-y-visible'>
      <div className="left w-full lg:w-[60%] h-full px-5 md:px-0 lg:pr-10 flex flex-col lg:overflow-y-auto">
        <div className="imageContainer w-full h-[45%] flex gap-5">
          <div className='w-[70%] h-full rounded-lg overflow-hidden bg-slate-400'>
            <img src={imgSrc[0]} alt="" className='w-full h-full object-cover' />
          </div>
          <div className='w-[30%] h-full flex flex-col gap-2 '>
            {
              imgSrc?.slice(1).map((src) => (
                <img key={src} src={src} className='w-full h-[32%] object-cover rounded-lg cursor-pointer' onClick={() => swapImg(src)} />
              ))
            }
          </div>
        </div>
        <div className="details w-full h-full lg:h-[55%] flex flex-col gap-5 pt-10">
          <div className="top flex justify-between items-end ">
            <div className="left flex flex-col gap-3 md:gap-5  ">
              <h1 className='title text-3xl font-medium'>Beautiful Apartment</h1>
              <p className='address flex items-center text-xs font-semibold text-gray-500'><img src={pin} className='h-4 ' /> 1234 Broadway St</p>
              <p className='w-16 p-1 bg-orange-300/50 rounded-md'>$1200</p>
            </div>
            <div className="right w-36 h-[80%] rounded-md bg-orange-300/50 flex flex-col items-center gap-1 p-5">
              <img src="https://placehold.co/50x50" alt="" className=' rounded-full' />
              <h1 className='text-xs font-semibold'>John Doe</h1>
            </div>
          </div>
          <div className="bottom mb-5 ">
            <p className='text-sm text-gray-700 font-medium leading-tight text-justify'>
              Future Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia vel, dicta reprehenderit consequatur temporibus ducimus rerum optio, sit est natus amet libero sunt rem repudiandae dolore, repellat modi necessitatibus quaerat earum facere inventore laborum. Non architecto suscipit reiciendis maiores sint a. Odio, veritatis eaque dignissimos doloremque provident corporis, soluta nobis enim similique asperiores ipsam minima sequi voluptatum tempora vero accusantium accusamus! Iure quia ut veniam autem doloremque consectetur quae suscipit!
            </p>
          </div>
        </div>
      </div>

      <div className="right w-full lg:w-[40%] h-full flex flex-col bg-[#fcf5f3] px-5  lg:overflow-y-auto">
        <SinglePageRight/>
      </div>
    </div>
  )
}

export default Single