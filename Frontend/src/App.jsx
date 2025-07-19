import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import { Home, Login, Signup, Single, List, Profile, UpdateUser, AddPost, VerifyEmail, ResetPassword } from './Pages/index'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/list' element={<List />} />
          <Route path='/:id' element={<Single />} />
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/:id/verify-email/:token' element={<VerifyEmail />} />

          <Route path='/user/add-post' element={<AddPost />} />
        </Route>

        <Route path='/user/:id/update' element={<UpdateUser />} />
        <Route path='/user/:id/reset-password' element={<ResetPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </>

  )
}

export default App
