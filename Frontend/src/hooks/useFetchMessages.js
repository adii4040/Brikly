import { useQuery } from '@tanstack/react-query'
import { fetchMessages, fetchChatList } from '../Services/messageService'

export const useFetchMessages = (receiverId) => {
    return useQuery({
        queryKey: ['get-messages'],
        queryFn: fetchMessages,

    })
}

export const useFetchChatList = () => {
    return useQuery({
        queryKey: ['get-chat-list'],
        queryFn: fetchChatList,
        //refetchInterval: 5000, // Refetch every 5 seconds
    })
}