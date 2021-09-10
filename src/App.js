import { getAuth } from '@firebase/auth';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Fragment } from 'react/cjs/react.production.min';
import { db } from './firebase';
import AuthForm from './pages/AuthForm';
import AuthContext from './store/auth-context';

function App() {
  console.log(db);
  const auth = getAuth();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };
  const checkUserHandler = () => {
    console.log(auth.currentUser);
  };
  const checkContextHandler = () => {
    console.log(authCtx.isLoggedIn, authCtx.userId);
  };

  return (
    <Fragment>
      <button onClick={logoutHandler}>logout</button>
      <button onClick={checkUserHandler}>check user status</button>
      <button onClick={checkContextHandler}>check context</button>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/auth' />
        </Route>

        <Route path='/auth'>
          <AuthForm />
        </Route>

        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
