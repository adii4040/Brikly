import React, { useState, useEffect } from 'react'

import { requestForgotPassword } from '../Services/authService'

import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'


function RequestForgotPassword() {

    const navigate = useNavigate();

    const queryClient = useQueryClient()


    const [form, setForm] = useState({
        email: "",
    });



    const requestForgotPasswordMutation = useMutation({
        mutationFn: async (formData) => {
            const data = await requestForgotPassword(formData)
            return data
        },
        onSuccess: (data) => {
            console.log(data.message);
            alert(data.message);
            queryClient.invalidateQueries({ queryKey: ['currentUser'] }).then(() => {
                navigate('/login');
            });
        },
        onError: (error) => {
            console.error(error.message);
            alert(error.message);
        }
    })


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        requestForgotPasswordMutation.mutate(form)

    }


    return (
        <div className='h-screen flex items-center justify-center bg-slate-950'>
            <div className='w-1/3   border mt-40 p-5 rounded-xl'>
                <h1 className='text-4xl text-white text-center'>Verify Your Email</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-10 pt-5'>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            autoFocus
                            className="h-10 p-2 rounded-lg outline-none"
                        />
                        <button type="submit" disabled={requestForgotPasswordMutation.isPending} className="h-10 bg-red-500 px-2 rounded-lg">
                            {requestForgotPasswordMutation.isPending ? "Verifying..." : "Verify Email"}
                        </button>
                    </div>
                </form>



            </div>
        </div>
    )
}

export default RequestForgotPassword