import React, { useState } from 'react'
import ChatContainer from './ChatContainer';
import ChatBox from './ChatBox';
import { useFetchChatList } from '../hooks/useFetchMessages';

function RightProfile({ currentUser }) {
  const { data } = useFetchChatList();
  const chats = data?.data?.chats || [];

  const [openChatUser, setOpenChatUser] = useState(null);
  const [expandBox, setExpandBox] = useState(false);

  const openChatBox = (user) => {
    console.log("open chat box for", user.fullname);
    setOpenChatUser(user);
  };

  const closeChatBox = () => {
    setOpenChatUser(null);
    setExpandBox(false);
  };

  const expandChatBox = () => {
    setExpandBox(prev => !prev);
  };

  return (
    <div className="w-full h-full lg:pb-5 flex flex-col relative ">
      <div className={`messages ${openChatUser ? "h-[40%] md:h-[60%] lg:h-1/2" : "h-full"} `}>
        <h1 className="text-3xl">Messages</h1>

        <div className="max-h-[90%] md:max-h-[80%] overflow-y-auto scrollbar-hide ">
          <div >
            {chats.map((chat) => {
              const otherUser = chat.senderId._id === currentUser._id ? chat.receiverId : chat.senderId;

              return (
                <ChatContainer
                  key={otherUser._id}
                  otherUser={otherUser}
                  openChatBox={openChatBox}
                />
              );
            })}
          </div>
        </div>
      </div>


      {openChatUser && (
        <div className={`chatBox w-full ${expandBox && "h-[65vh] lg:h-[95%]"}  absolute bottom-0 z-50  `} >
          <ChatBox
            expandBox={expandBox}
            expandChatBox={expandChatBox}
            sender={openChatUser}
            closeChatBox={closeChatBox}
          />
        </div>
      )}
    </div>
  );
}

export default RightProfile;
