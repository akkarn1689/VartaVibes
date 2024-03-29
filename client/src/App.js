import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './App.css';

import Body from './components/Body';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';
import Logout from './components/Logout';
import Chat from './components/Chat';

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Body/>,
  children:[
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/about",
      element: <About/>,
    },
    {
      path: "/contact",
      element: <Contact/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>,
    },
    {
      path:'/logout',
      element: <Logout/>,
    },
    {
      path:'/chat',
      element: <Chat/>,
    },
    {
      path: "*",
      element: <ErrorPage/>
    },
  ],
}])

const App = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
