import {useQuery} from '@tanstack/react-query'
import {fetchCurrentUser} from '../Services/authService'
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../features/authSlice';

const useFetchCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}

export {
    useFetchCurrentUser
}