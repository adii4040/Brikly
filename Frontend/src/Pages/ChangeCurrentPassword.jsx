import React, { useState, useEffect } from 'react'

import ResetPassword from '../Components/ResetPassword';
import { updatePassword } from '../Services/authService'
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFetchCurrentUser } from '../hooks/useFetchCurrentUser'

function ChangeCurrentPassword() {

  const navigate = useNavigate();

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




  return (
    <>
    <div>
      <ResetPassword mutationType={updatePasswordMutaion} userData={userData}/>
    </div>
    </>
  )
}

export default ChangeCurrentPassword