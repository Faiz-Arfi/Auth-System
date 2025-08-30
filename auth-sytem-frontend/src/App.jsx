import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'

function App() {

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
        <Navbar />
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
