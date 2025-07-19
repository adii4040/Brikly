import React, { useState, useEffect } from 'react'

import { updatePassword } from '../Services/authService'
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser'

function ResetPassword() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });


  const { data: userData } = useFetchCurrentUser();
  const currentUser = userData?.data.user
  const updatePasswordUrl = `/api/v1/user/${currentUser?._id}/reset-password`;

  const queryClient = useQueryClient()
  const updatePasswordMutaion = useMutation({
    mutationFn: async (formData) => {
      const data = await updatePassword(updatePasswordUrl, formData)
      return data
    },
    onSuccess: (data) => {
      console.log("Password Updated successful:", data);

      queryClient.refetchQueries({ queryKey: ['currentUser'] })
      navigate('/user/profile');
    },
    onError: (error) => {
      console.error("Password update failed:", error.message);
      alert(error.message);
    }
  })


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updatePasswordMutaion.mutate(form)
  }


  return (
    <>
      <div onClick={() => navigate('/user/profile')} >Profile</div>
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
              <button type="submit" disabled={updatePasswordMutaion.isPending} className="h-10 bg-red-500 px-2 rounded-lg">
                {updatePasswordMutaion.isPending ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default ResetPassword