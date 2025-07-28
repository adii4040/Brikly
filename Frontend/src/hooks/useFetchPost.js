import { useQuery } from '@tanstack/react-query'
import { fetchAllPosts } from '../Services/postService'

const useFetchAllPosts = (filterParams = {}) => {
    return useQuery({
        queryKey: ["allPosts", filterParams],
        queryFn: () => fetchAllPosts(filterParams),
        retry: false,
        staleTime: 0
    })
}



export {
    useFetchAllPosts
}