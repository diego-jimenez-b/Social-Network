import { useContext, Fragment } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import MainNavigation from './components/navigation-bar/MainNavigation';
import AuthForm from './pages/AuthForm';
import GeneralPosts from './pages/GeneralPosts';
import Profile from './pages/Profile';
import AuthContext from './store/auth-context';
import backgroundImg from './assets/background.jpg';

function App() {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname !== '/auth' && <MainNavigation />}
      <img className='background' src={backgroundImg} alt='background' />

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
          <GeneralPosts isLoggedIn={authCtx.isLoggedIn} />
        </Route>

        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
