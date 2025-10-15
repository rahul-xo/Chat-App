import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterUser from './Pages/RegisterUser.jsx'
import LoginUser from './Pages/LoginUser.jsx'
import AuthUser from './services/authUser.jsx'
import ChatPage from './Pages/ChatPage.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children:[
      {
        path:'/',
        element: <AuthUser><ChatPage/></AuthUser>
      },
      {
        path:'/register',
        element:<RegisterUser/>
      },

      {
        path:'/login',
        element:<LoginUser/>
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
