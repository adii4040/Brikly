import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Apartment from '../Components/Apartment'
import { listData } from '../lib/dummyData'
import ChatContainer from '../Components/ChatContainer'


import { useNavigate } from 'react-router-dom'
import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resendVerificationEmail } from '../Services/authService'

function Profile() {
  const data = listData
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { data: userData, isLoading, isError } = useFetchCurrentUser();

  const isLoggedIn = !!userData; // or more explicitly: user !== null

  
  const currentUser = userData?.data?.user
  console.log(currentUser)
  
  
  
  //Resend Email Verification Code
  const resendEmailVerifcationMutation = useMutation({
    mutationFn: async () => {
      const data = await resendVerificationEmail()
      return data
    },
    onSuccess: (data) => {
      console.log(data.message || "Email Verification code has been sent!")
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      alert(data.message || "Email Verification code has been sent!")

    },
    onError: (error) => {
      console.error(error)
    }
  })


  if (isLoading) return <div>Loading...</div>;


  if (isError) return <div>Not logged in</div>;


  return (
    <div className='w-full h-contentheight px-5 md:px-0 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden scrollbar-hide'>
      <div className='left w-full lg:w-[60%] lg:pr-10 '>
        <div className="userInfo w-full flex flex-col gap-10 ">
          <div className='flex justify-between'>
            <h1 className='text-3xl'>User Information</h1>
            <button className='bg-orange-400 text-xs px-5 hover:bg-orange-300 rounded-sm '><Link to={`/user/${currentUser?._id}/update`}>Update Profile</Link></button>

            <button className='bg-orange-400 text-xs px-5 hover:bg-orange-300 rounded-sm '><Link to={`/user/${currentUser?._id}/reset-password`}>Change Password</Link></button>
          </div>
          <div className='infoContainer flex flex-col gap-3'>
            <p className='flex items-center gap-3 text-sm'>Avatar:<img src={currentUser ? currentUser?.avatar?.url : "https://toppng.com/uploads/preview/cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png"} alt="" className='w-10 h-10 object-cover rounded-full' /></p>
            <p className='text-sm flex items-center gap-3'>Username: <span className='text-base font-semibold'>{currentUser?.fullname}</span></p>
            <p className='text-sm flex items-center gap-3'>E-mail: <span className='text-base font-semibold'>{currentUser?.email}</span></p>

            {
              !currentUser.isEmailVerified ? <p className='w-24 p-1 rounded bg-orange-300' onClick={() => resendEmailVerifcationMutation.mutate()} >{resendEmailVerifcationMutation.isPending ? "Verifying..." : "Verify Email"}</p> : <p>Verified</p>
            }

          </div>
        </div>
        <div className="userList pt-5">
          <div className='flex justify-between'>
            <h1 className='text-3xl'>My List</h1>
            <button className='bg-orange-400 text-xs px-5 hover:bg-orange-300 rounded-sm '><Link to={'/user/add-post'}>Add New Post</Link></button>
          </div>
          <div className='lg:max-h-[60vh] mt-5 pb-5 overflow-y-auto scrollbar-hide'>
            {
              data?.map((item) => (
                <div key={item.id} className=''>
                  <Apartment item={item} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='right w-full lg:w-[40%] h-full bg-[#fcf5f3] px-5 lg:overflow-y-auto'>
        <ChatContainer />
      </div>
    </div>

  )
}

export default Profile