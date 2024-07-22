import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Today from './components/Today';

import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../src/firebaseConfig';

const AppLayout = () => {
  const [user, loadingAuth] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{

    if(!user){
      navigate('/login'); // Redirect to login if no user is signed in
    }
  },[user])
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
        path: 'today',
        element: <Today />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={router} />);
