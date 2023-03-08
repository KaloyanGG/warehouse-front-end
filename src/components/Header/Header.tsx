import { useState, useEffect, useContext } from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export function Header() {

  const { currentUser } = useContext(UserContext);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><h1>Hello, {currentUser ? currentUser.username : 'guest'}</h1></li>
        </ul>
      </nav>

    </header>
  );
}