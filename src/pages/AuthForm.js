import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes('@'));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length >= 6);

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim().length >= 4);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      emailBlurHandler();
      passwordBlurHandler();
      if (!isLogin && !usernameIsValid) usernameBlurHandler();
      return;
    }

    if (isLogin) {
      authCtx.login(email, password);
    } else {
      authCtx.createNewUser(email, password, username);
    }
  };

  const toggleLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const getClasses = (error) => {
    return `${classes.message} ${error ? classes.red : ''}`;
  };

  const passwordAutoTxt = isLogin ? 'current-password' : 'new-password';

  return (
    <div className={classes['form-container']}>
      <h1>Posts Demo</h1>

      <form onSubmit={formSubmitHandler}>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          autoComplete='email'
          className={emailHasError ? classes.error : ''}
        />
        {emailHasError && (
          <span className={getClasses(emailHasError)}>Invalid email</span>
        )}

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          autoComplete={passwordAutoTxt}
          className={passwordHasError ? classes.error : ''}
        />
        {(!isLogin || passwordHasError) && (
          <span className={getClasses(passwordHasError)}>
            6 characters or more
          </span>
        )}

        {!isLogin && (
          <div className={classes['user-info']}>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              className={usernameHasError ? classes.error : ''}
            />
            <span className={getClasses(usernameHasError)}>
              4 characters or more
            </span>
          </div>
        )}

        <button className={`btn ${classes.btn}`} type='submit'>
          {isLogin ? 'Log in' : 'Sign up'}
        </button>
      </form>

      <div className={classes.actions}>
        <span onClick={toggleLoginHandler} className={classes.text}>
          {isLogin
            ? "Don't have an account? Register!"
            : 'Login with existing account'}
        </span>
        <Link to='general'>Enter as guest</Link>
      </div>
    </div>
  );
};

export default AuthForm;
