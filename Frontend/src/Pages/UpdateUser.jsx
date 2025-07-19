import React from 'react'
import UpdateUserForm from '../Components/UpdateUserForm'
import { useNavigate } from 'react-router-dom'

function UpdateUser() {
  const navigate = useNavigate();
  return (
    <>
    <div onClick={() => navigate('/user/profile')} >Profile</div>
    <div>
      <UpdateUserForm />
    </div>
    </>
  )
}

export default UpdateUser