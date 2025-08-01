import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Loader from './Components/Loader';
import { Home, Login, Signup, Single, List, Profile, UpdateUser, AddPost, VerifyEmail, ChangeCurrentPassword, RequestForgotPassword, ResetForgotPassword } from './Pages/index'
import { useFetchCurrentUser } from './hooks/useFetchCurrentUser';
import { Navigate } from 'react-router-dom'
function App() {
  const { data: userData, isLoading } = useFetchCurrentUser();
  const isLoggedIn = !!userData;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/post/:postId' element={<Single />} />

        <Route
          path='/user/profile'
          element={isLoggedIn ? <Profile /> : <Navigate to='/login' />}
        />
        <Route
          path='/user/:id/verify-email/:token'
          element={<VerifyEmail />}
        />
        <Route
          path='/user/add-post'
          element={isLoggedIn ? <AddPost /> : <Navigate to='/login' />}
        />

      </Route>

      <Route path='/user/:id/update' element={<UpdateUser />} />
      <Route path='/user/:id/reset-password' element={<ChangeCurrentPassword />} />
      <Route path='/user/request-forgot-password' element={<RequestForgotPassword />} />
      <Route path='/user/:token/reset-forgot-password' element={<ResetForgotPassword />} />

      <Route
        path='/login'
        element={!isLoggedIn ? <Login /> : <Navigate to='/home' />}
      />
      <Route
        path='/signup'
        element={!isLoggedIn ? <Signup /> : <Navigate to='/' />}
      />
      
    </Routes>
  );
}


export default App
