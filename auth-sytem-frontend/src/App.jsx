import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import { useEffect, useState } from 'react'
import { getCurrentUser } from './api/auth'

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
      path: "/user/dashboard",
      element: <>
        <Navbar isLoggedIn={true} />
        <UserPage />
      </>,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
