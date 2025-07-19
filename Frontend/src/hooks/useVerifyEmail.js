// src/hooks/useVerifyEmail.js
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

const useVerifyEmail = (verifyEmailUrl) => {
    const navigate = useNavigate()

    return useQuery({
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
            navigate('/login');
        },
        onError: (error) => {
            console.error("Error verifying email:", error)
        }
    });
};

export default useVerifyEmail;
