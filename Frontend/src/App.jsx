import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './Components/Layout'
import { Home, Login, Signup, Single, List, Profile, Update, AddPost } from './Pages/index'
import { useFetchCurrentUser } from './hooks/useFetchCurrentUser';


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
          <Route path='/user/update' element={  <Update />} />
          <Route path='/user/add-post' element={<AddPost />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </>

  )
}

export default App
