import React, { useState, useEffect } from 'react'

import { loginUser } from '../Services/authService'

import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'


function Login() {

  const navigate = useNavigate();

  const queryClient = useQueryClient()


  const [form, setForm] = useState({
    email: "",
    password: ""
  });



  const loginUserMutation = useMutation({
    mutationFn: async (formData) => {
      const data = await loginUser(formData)
      return data
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);

      queryClient.invalidateQueries({ queryKey: ['currentUser'] }).then(() => {
        navigate('/home');
      });
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  })


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUserMutation.mutate(form)

  }


  return (
    <div className='h-screen flex items-center justify-center bg-slate-950'>
      <div className='w-1/3 h-96  border mt-40 p-5 rounded-xl'>
        <h1 className='text-4xl text-white text-center'>Login</h1>
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
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="h-10 p-2 rounded-lg outline-none"
            />
            <button type="submit" disabled={loginUserMutation.isPending} className="h-10 bg-red-500 px-2 rounded-lg">
              {loginUserMutation.isPending ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>


        <div className='pt-5 flex justify-between text-white '>
          <h1 >Forget Password?</h1>
          <p>Dont have an account? <Link to={'/signup'} className='text-blue-500'>SIGN UP</Link> </p>
        </div>

        {/* {
          isForgot && <ForgetPasswordEmailVerifyForm setMessage={setMessage} closeForm={closeForm} />
        } */}



      </div>
    </div>
  )
}

export default Login