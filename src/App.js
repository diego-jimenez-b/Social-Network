import { getAuth } from '@firebase/auth';
import { useContext } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { Fragment } from 'react/cjs/react.production.min';
import { db } from './firebase';
import MainNavigation from './components/navigation-bar/MainNavigation';
import AuthForm from './pages/AuthForm';
import GeneralPosts from './pages/GeneralPosts';
import Profile from './pages/Profile';
import AuthContext from './store/auth-context';

function App() {
  console.log(db);
  const auth = getAuth();
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  const checkUserHandler = () => {
    console.log(auth.currentUser);
  };
  const checkContextHandler = () => {
    console.log(authCtx.isLoggedIn, authCtx.userId, authCtx.userName);
  };

  return (
    <Fragment>
      <div className='btns'>
        <button onClick={checkUserHandler}>check user status</button>
        <button onClick={checkContextHandler}>check context</button>
      </div>

      {location.pathname !== '/auth' && <MainNavigation />}

      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>

        <Route path='/auth'>
          {!authCtx.isLoggedIn && <AuthForm />}
          {authCtx.isLoggedIn && <Redirect to='/profile' />}
        </Route>

        {authCtx.isLoggedIn && (
          <Route path='/profile'>
            <Profile />
          </Route>
        )}

        <Route path='/general'>
          <GeneralPosts />
        </Route>

        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
