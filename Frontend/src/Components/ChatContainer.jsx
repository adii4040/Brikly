import React from 'react'
import ChatBox from './ChatBox';

function ChatContainer({ otherUser, isOpen, expandBox, openChatBox, closeChatBox, expandChatBox, currentUser }) {
  console.log("isOpen for", otherUser.fullname, "=>", isOpen)

  return (
    <div>
      {/* User Card */}
      <div className='z-10 w-full h-[80%] mt-5 flex flex-col gap-3 overflow-y-auto scrollbar scrollbar-thumb-orange-300 scrollbar-track-transparent scrollbar-hide lg:scrollbar '>
        <div
          className="message w-full h-16 p-5 flex items-center gap-5 bg-white hover:bg-slate-200 rounded-md"
          onClick={() => openChatBox(otherUser)}
        >
          <img src={otherUser?.avatar?.url} alt="" className='w-10 h-10 object-cover rounded-full' />
          <div className='w-full overflow-hidden'>
            <h1 className='font-bold'>{otherUser?.fullname}</h1>
            <p className='truncate text-sm'>First Message</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChatContainer
