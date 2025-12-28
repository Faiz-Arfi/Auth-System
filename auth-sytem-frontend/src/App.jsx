import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import { useEffect, useState } from 'react'
import { getCurrentUser } from './api/auth'
import ProtectedRoutes from './components/ProtectedRoutes'
import ChangeRole from './pages/features/ChangeRole'
import ChangePassword from './pages/features/ChangePassword'
import ActivityLog from './pages/features/ActivityLog'
import ProfileSetting from './pages/features/ProfileSetting'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'

function App() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate;

  //check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null);
      }
    }
    fetchUser();
    //navigate to dashboard if user is logged in
    if (user) {
      navigate('/user/dashboard');
    }

  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navbar />
        <HomePage />
      </>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <>
        <Navbar />
        <AuthPage />
      </>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/reset-password",
      element: <>
        <Navbar />
        <ResetPassword />
      </>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/update-password",
      element: <>
        <Navbar />
        <UpdatePassword />
      </>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/user/dashboard",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <UserPage />
        </ProtectedRoutes>
      </>,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/user/change-role",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ChangeRole />
        </ProtectedRoutes>
      </>,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/user/change-password",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ChangePassword />
        </ProtectedRoutes>
      </>,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/user/activity-log",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ActivityLog />
        </ProtectedRoutes>
      </>,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/user/profile-setting",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ProfileSetting />
        </ProtectedRoutes>
      </>,
      // errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
