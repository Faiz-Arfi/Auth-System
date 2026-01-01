import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import NotFoundErrorPage from './pages/NotFoundErrorPage'
import { useEffect, useState } from 'react'
import { getCurrentUser } from './api/auth'
import ProtectedRoutes from './components/ProtectedRoutes'
import ChangeRole from './pages/features/ChangeRole'
import ChangePassword from './pages/features/ChangePassword'
import ActivityLog from './pages/features/ActivityLog'
import ProfileSetting from './pages/features/ProfileSetting'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import AwsomeActivity from './pages/AwsomeActivity'
import About from './pages/About'
import Contact from './pages/Contact'
import OAuthCallback from './pages/OAuthCallback'

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
      </>
    },
    {
      path: "/login",
      element: <>
        <Navbar />
        <AuthPage />
      </>
    },
    {
      path: "/about",
      element: <>
        <Navbar />
        <About />
      </>
    },
    {
      path: "/contact",
      element: <>
        <Navbar />
        <Contact />
      </>
    },
    {
      path: "/reset-password",
      element: <>
        <Navbar />
        <ResetPassword />
      </>
    },
    {
      path: "/update-password",
      element: <>
        <Navbar />
        <UpdatePassword />
      </>
    },
    {
      path: "/oauth-callback",
      element: <OAuthCallback />
    },
    {
      path: "/user/dashboard",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <UserPage />
        </ProtectedRoutes>
      </>
    },
    {
      path: "/user/change-role",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ChangeRole />
        </ProtectedRoutes>
      </>
    },
    {
      path: "/user/change-password",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ChangePassword />
        </ProtectedRoutes>
      </>
    },
    {
      path: "/user/activity-log",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <ActivityLog />
        </ProtectedRoutes>
      </>
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
    {
      path: "/user/awesome-activity",
      element: <>
        <ProtectedRoutes>
          <Navbar isLoggedIn={true} />
          <AwsomeActivity />
        </ProtectedRoutes>
      </>
    },
    {
      path: "*",
      element: <>
        <NotFoundErrorPage />
      </>
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
