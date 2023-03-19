import { useContext } from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { logout } from '../../utils/user-requets';
export function Header() {

  const { currentUser, userLogout } = useContext(UserContext);

  function logoutFn() {
    userLogout();
    logout();
  }

  return (
    <header>
      <nav>
        <ul>
          <li><button className='nav-link'><Link to="/">Home</Link></button></li>

          {currentUser
            ? <li><button className='nav-link' onClick={logoutFn}>Logout</button></li>
            : <li><button className='nav-link'><Link to="/register">Register</Link></button></li>
          }

          <li className='hello'><h4>Hello, {currentUser ? currentUser.username : 'guest'}</h4></li>
        </ul>
      </nav>

    </header>
  );
}