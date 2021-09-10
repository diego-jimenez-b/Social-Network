import { useContext, useRef, useState } from 'react';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // const emailIsValid =
    //   enteredEmail.trim() !== '' && enteredEmail.includes('@');
    // const passwordIsValid = enteredPassword.length >= 6;

    // if (!emailIsValid || !passwordIsValid) return;

    if (isLogin) {
      authCtx.login(enteredEmail, enteredPassword);
    } else {
      authCtx.createNewUser(enteredEmail, enteredPassword);
    }
  };

  const toggleLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const passwordAutoTxt = isLogin ? 'current-password' : 'new-password';

  return (
    <div className={classes['form-container']}>
      <h1>Some title</h1>
      <form onSubmit={formSubmitHandler}>
        <input
          type='text'
          placeholder='Email'
          ref={emailInputRef}
          autoComplete='email'
        />
        <input
          type='password'
          placeholder='Password'
          ref={passwordInputRef}
          autoComplete={passwordAutoTxt}
        />
        <button type='submit'>{isLogin ? 'Log in' : 'Sign up'}</button>
      </form>

      <span onClick={toggleLoginHandler} className={classes.text}>
        Don't have an account? Register!
      </span>
    </div>
  );
};

export default AuthForm;
