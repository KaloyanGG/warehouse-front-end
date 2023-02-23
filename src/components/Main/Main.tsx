import { useEffect, useState } from 'react';
import Home from './Home/Home';
import './Main.scss'
import { getAllUsers } from '../../utils/user-requets';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Register } from './Register/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,

  },

]);


export function Main() {


  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //     getAllUsers().then(
  //         (response) => {
  //             setUsers(response.data);
  //         }
  //     )
  // }, [])

  return (

    <main>
      <RouterProvider router={router} />
    </main>
  );
}