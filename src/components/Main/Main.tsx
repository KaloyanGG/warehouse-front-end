import { useEffect, useState } from 'react';
import Home from './Home/Home';
import './Main.scss'
import { getAllUsers } from '../../utils/user-requets';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Register } from './Register/Register';
import { Edit } from './Edit/Edit';
import { getProductById } from '../../utils/product-requests';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/edit/:productId',
    element: <Edit />,
    loader: ({ params }) => {
      return getProductById(params.productId as any);
    },
    errorElement: <div>Product not found</div>,
  }

]);


export function Main() {
  return (

    //todo: fix this 
    <main>
      <RouterProvider router={router} />
    </main>
  );
}


