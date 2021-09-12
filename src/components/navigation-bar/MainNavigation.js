import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <nav className={classes.navbar}>
      <div>
        <Link to='/general'>Home</Link>
        <Link to='/profile'>Profile</Link>
      </div>

      <button className='btn' onClick={logoutHandler}>Logout</button>
    </nav>
  );
};

export default MainNavigation;
