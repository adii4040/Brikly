import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import { sendMessage } from '../Services/messageService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFetchMessages } from '../hooks/useFetchMessages';

import { format } from 'timeago.js'


function ChatBox({ expandBox, closeChatBox, expandChatBox, postedBy, sender }) {

    const [text, setText] = useState("")

    const receiverId = sender ? sender?._id : postedBy?._id  //receiverId is either the sender's or postedBy's ID i.e the other user in the chat

    const { data: messages, isLoading, isError, error } = useFetchMessages(receiverId);
    const messagesData = messages?.data?.messages || [];

    const queryClient = useQueryClient();

    const handlechange = (e) => {
        setText(e.target.value)
        console.log(text)

    }
    const sendMessageMutation = useMutation({
        mutationFn: async ({ formData }) => {
            const data = await sendMessage(receiverId, formData)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(['get-messages', receiverId]) // Invalidate the messages query to refetch new messages

        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            console.error("Message cannot be empty");
            return;
        }
        const formData = { text };
        sendMessageMutation.mutate({ formData });
        setText(''); // Clear the input after sending
    }



    return (
        <div className='h-full transition-all duration-300  shadow-xl rounded-t-2xl overflow-hidden'>
            <div className='w-full h-14 bg-yellow-300 flex items-center justify-between gap-5 p-5'>
                <div className='flex gap-5 items-center'>
                    <img src={`${sender ? sender?.avatar?.url : postedBy?.avatar?.url}`} alt="" className='w-7 h-7 object-cover rounded-full' />
                    <h1 className='text-sm font-semibold'>{sender ? sender?.fullname : postedBy?.fullname}</h1>
                </div>
                <div className='flex cursor-pointer'>
                    <div className='flex '>
                        <IoIosArrowDown className={`text-xl ${expandBox ? "block" : "hidden"} `} onClick={expandChatBox} />
                        <IoIosArrowUp className={`text-xl ${expandBox ? "hidden" : "block"} `} onClick={expandChatBox} />
                    </div>
                    <RxCross2 className=' text-3xl ' onClick={closeChatBox} />
                </div>
            </div>
            <div className={`chatBox w-full   ${expandBox ? "h-[77%] md:h-[85%] lg:h-[82%]" : "h-56"} flex flex-col gap-5 p-5 bg-slate-50  overflow-y-auto scrollbar-hide`}>
                {
                    messagesData.length === 0 ? (
                        <div className='w-full h-full flex items-center justify-center'>
                            <h1 className='text-xl font-semibold text-gray-500'>No messages yet</h1>
                        </div>
                    ) : (
                        messagesData.map((message, index) => (
                            <div key={index} className={`chatMessage max-w-[80%]  text-sm ${message.senderId._id !== receiverId ? "text-right self-end" : "text-left self-start"}`}>
                                <p className={`w-full text-start ${message.senderId._id !== receiverId ? "bg-blue-300" : " bg-orange-700 text-white"} bg-orange-300 rounded-md p-1 mb-1`}>{message?.text}.</p>
                                <span className='text-xs py-1 bg-orange-300/50 rounded-md px-1'>{format(message?.createdAt)}</span>
                            </div>
                        ))
                    )

                }

            </div>

            <div >
                <form className="send w-full h-14 flex border border-yellow-100" onSubmit={handleSubmit}>

                    <input type="text" name='text'
                        className='w-full resize-none scrollbar-hide p-2' placeholder='Text...'
                        value={text} onChange={handlechange} />
                    <button className='w-36 bg-yellow-100' type='submit'>Send</button>
                </form>
            </div>

        </div>
    )
}

export default ChatBox