import React, { useState,} from 'react'
import { useNavigate } from "react-router-dom";

function ResetPassword({ mutationType, userData }) {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        mutationType.mutate(form)
    }


    return (
        <>
            {
                userData?.data?.user &&
                <div className='flex justify-end pr-10 pt-5'>
                    <button onClick={() => navigate('/user/profile')} className='text-black'>Back to Profile</button>
                </div>
            }
            <div className='h-screen flex items-center justify-center bg-slate-950'>
                <div className='w-1/3 h-80  border mt-40 p-5 rounded-xl'>
                    <h1 className='text-4xl text-white text-center'>Change Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-10 pt-5'>
                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                autoFocus
                                className="h-10 p-2 rounded-lg outline-none"
                            />
                            <input
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                className="h-10 p-2 rounded-lg outline-none"
                            />
                            <button type="submit" disabled={mutationType.isPending} className="h-10 bg-red-500 px-2 rounded-lg">
                                {mutationType.isPending ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ResetPassword