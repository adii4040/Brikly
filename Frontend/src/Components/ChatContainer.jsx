import React, { useState } from 'react'
import ChatBox from './ChatBox';
function ChatContainer() {
  const [openChat, setOpenChat] = useState(false)
  const [expandBox, setExpandBox] = useState(false)
  const openChatBox = () => {
    setOpenChat(prev => !prev)
    setExpandBox(false)
  }

  const expandChatBox = () => {
    setExpandBox(prev => !prev)
  }
  return (
    <div className='w-full h-full lg:pb-5 flex flex-col'>
      <div className={`messages ${openChat ? "h-[40%] md:h-[60%] lg:h-1/2 " : "h-full"} ${expandBox && "hidden"}`}>
        <h1 className='text-3xl'>Messages</h1>
        <div className='w-full h-[80%] mt-5 flex flex-col gap-3 overflow-y-auto scrollbar  scrollbar-thumb-orange-300 scrollbar-track-transparent scrollbar-hide lg:scrollbar'>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md" onClick={openChatBox}>
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>
          <div className="message w-full h-16 p-5 flex items-center gap-5 bg-white rounded-md">
            <img src="https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png" alt="" className='w-10 h-10 object-cover rounded-full' />
            <div className='w-full overflow-hidden'>
              <h1 className='font-bold'>Aditya Kumar Singh</h1>
              <p className='truncate text-sm '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, dolorem!</p>
            </div>
          </div>


        </div>
      </div>
      <div className={`chatBox ${openChat ? "h-[60%]" : "h-0"} ${expandBox ? " h-[90%] md:h-full" : "h-[60%]"}`}>
        <ChatBox openChat={openChat} openChatBox={openChatBox} expandBox={expandBox} expandChatBox={expandChatBox} />
      </div>
    </div>
  )
}


export default ChatContainer