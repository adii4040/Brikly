import { useQuery } from '@tanstack/react-query'
import { fetchCurrentUser } from '../Services/authService'

const useFetchCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime:0,
        refetchInterval: (data) => {
            if (data?.data?.user?.isEmailVerified) {
                return 5000 
            }
            return false
        }
    })
}

export {
    useFetchCurrentUser
}