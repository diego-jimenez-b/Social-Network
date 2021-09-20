import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  if (!authCtx.isLoggedIn) {
    return (
      <nav className={classes.navbar}>
        <Link to='/auth'>
          <button className='btn'>Login</button>
        </Link>
      </nav>
    );
  }

  return (
    <nav className={classes.navbar}>
      <div>
        <Link to='/general'>Home</Link>
        <Link to='/profile'>Profile</Link>
      </div>

      <button className={`btn ${classes.btn}`} onClick={logoutHandler}>
        Logout
      </button>
    </nav>
  );
};

export default MainNavigation;
