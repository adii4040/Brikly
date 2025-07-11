import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
function ChatBox({ openChat, openChatBox, expandBox, expandChatBox }) {



    return (
        <div className={` w-full h-full ${openChat ? "block" : "hidden"}`}>
            <div className='w-full h-14 bg-yellow-300 flex items-center justify-between gap-5 p-5'>
                <div className='flex gap-5 items-center'>
                    <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-7 h-7 object-cover rounded-full' />
                    <h1 className='text-sm font-semibold'>Aditya Singh</h1>
                </div>
                <div className='flex cursor-pointer'>
                    <div className='flex '>
                        <IoIosArrowDown className={`text-xl ${expandBox ? "block" : "hidden"} `} onClick={expandChatBox} />
                        <IoIosArrowUp className={`text-xl ${expandBox ? "hidden" : "block"} `} onClick={expandChatBox} />
                    </div>
                    <RxCross2 className=' text-3xl ' onClick={openChatBox} />
                </div>
            </div>
            <div className={`chatBox w-full  ${expandBox ? "h-[85%]" : "h-56"} flex flex-col gap-5 p-5 bg-slate-50  overflow-y-auto scrollbar-hide`}>
                <div className="chatMessage w-[80%]  text-sm">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
                <div className="chatMessage w-[80%]  text-sm own">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
                <div className="chatMessage w-[80%]  text-sm">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
                <div className="chatMessage w-[80%]  text-sm own">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
                <div className="chatMessage w-[80%] text-sm">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
                <div className="chatMessage w-[80%] text-sm own">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
                <div className="chatMessage w-[80%] text-sm ">
                    <p className='text-start'>Lorem, ipsum dolor sit amet Lorem ipsum do sit amet consectetur adipisicing elit. Perspiciatis, nulla! </p>
                    <span className='text-xs py-1 bg-orange-300/50'>1 hour ago</span>
                </div>
            </div>

            <div className="send w-full h-14 flex border border-yellow-100">
                <textarea name="" id="" className='w-full resize-none scrollbar-hide p-2' placeholder='Text...'></textarea>
                <button className='w-36 bg-yellow-100' type='submit'>Send</button>
            </div>

        </div>
    )
}

export default ChatBox