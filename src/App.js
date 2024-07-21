import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import Today from './components/Today';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Login from './components/Login';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
        {
            path : "today",
            element: <Today />
        }
    ],
  },
  {
    path:'/login',
    element: <Login />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router} />);
