import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import useVerifyEmail from '../hooks/useVerifyEmail'

function VerifyEmail() {
    const param = useParams();
    const navigate = useNavigate()
    const verifyEmailUrl = `http://localhost:8000/api/v1/user/${param.id}/verify-email/${param.token}`

    const { isLoading, error, data } = useQuery({
        queryKey: ['verifyEmail'],
        queryFn: async () => {
            const res = await fetch(verifyEmailUrl, {
                method: 'GET',
                credentials: 'include'
            });

            const contentType = res.headers.get('content-type');

            if (!res.ok) {
                const errorData = contentType && contentType.includes('application/json')
                    ? await res.json()
                    : { error: await res.text() }

                console.error('❌ Backend error:', errorData.message);
                throw new Error(errorData.message || "Failed to verify email!!")
            }

            const data = await res.json();
            return data;
        },
        retry: false,
        onSuccess: (data) => {
            console.log("✅ Email verified successfully", data);
            navigate('/home');
        },
        onError: (error) => {
            console.error("Error verifying email:", error)
        }
    });
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    if (data) {
        return <div>Email verified successfully!</div>
    }

}

export default VerifyEmail