import { useContext, useEffect, useState } from 'react';
import { WarehouseItems } from './WarehouseItems/WarehouseItems';
import { Login } from './Login/Login';
import { UserContext } from '../../../context/UserContext';

export default function Home() {

  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser
        ? <WarehouseItems />
        : <Login />}
    </>
  );
}

