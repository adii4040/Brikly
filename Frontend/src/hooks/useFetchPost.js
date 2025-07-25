import { useQuery } from '@tanstack/react-query'
import { fetchAllPosts } from '../Services/postService'

const useFetchAllPosts = () => {
    return useQuery({
        queryKey: ["allPosts"],
        queryFn: fetchAllPosts,
        retry: false,
        staleTime: 0
    })
}



export {
    useFetchAllPosts
}