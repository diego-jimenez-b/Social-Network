import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
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

      <Button onClick={logoutHandler}>Logout</Button>
    </nav>
  );
};

export default MainNavigation;
