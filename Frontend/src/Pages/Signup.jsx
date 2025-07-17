import React from 'react'
import { useState } from 'react'
import { registerUser } from '../Services/authService'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'


function Signup() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    avatar: null
  })


  const registerUserMutation = useMutation({
    mutationFn: async (formData) => {
      const data = await registerUser(formData)
      return data
    },

    onSuccess: (data) => {
      console.log(data)
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    },

    onError: (error) => {
      console.error("User registration failed: ", error.message)
      alert(error.message)
    }
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setForm({ ...form, avatar: files[0] });  // ✅ Correct usage
    } else {
      setForm({ ...form, [name]: value });
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    formDataObj.append("fullname", form.fullname)
    formDataObj.append("email", form.email)
    formDataObj.append("password", form.password)
    formDataObj.append("avatar", form.avatar)

    registerUserMutation.mutate(formDataObj)
  }


  return (
    <div className='h-screen flex items-center justify-center bg-slate-950'>
      <div className='w-1/3 h-96  border mt-40 p-5 rounded-xl'>
        <h1 className='text-4xl text-white text-center'>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-10 pt-5'>
            <input
              name="fullname"
              type="text"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Your Full Name"
              autoFocus
              className="h-10 p-2 rounded-lg outline-none"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              autoFocus
              className="h-10 p-2 rounded-lg outline-none"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="h-10 p-2 rounded-lg outline-none"
            />

            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              placeholder='Avatar File'
              className="h-10 p-2 rounded-lg outline-none text-white"
            />

            <button type="submit" disabled={registerUserMutation.isPending} className="h-10 bg-red-500 px-2 rounded-lg">
              {registerUserMutation.isPending ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>


        {/* <div className='pt-5 flex justify-between text-white '>
          <h1 onClick={requestEmailForm} >Forget Password?</h1>
          <p>Dont have an account? <Link to={'/signup'} className='text-blue-500'>SIGN UP</Link> </p>
        </div>

        {
          isForgot && <ForgetPasswordEmailVerifyForm setMessage={setMessage} closeForm={closeForm} />
        } */}



      </div>
    </div>
  )
}

export default Signup