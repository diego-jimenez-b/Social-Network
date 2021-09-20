import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const lastnameInputRef = useRef();

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
      const enteredName = nameInputRef.current.value.trim();
      const enteredLastname = lastnameInputRef.current.value.trim();

      if (enteredName === '' || enteredLastname === '') {
        alert('Please enter a valid name and lastname (non-empty inputs)');
        return;
      }

      const fullname = enteredName + ' ' + enteredLastname;
      authCtx.createNewUser(
        enteredEmail,
        enteredPassword,
        enteredName,
        enteredLastname,
        fullname
      );
    }
  };

  const toggleLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const passwordAutoTxt = isLogin ? 'current-password' : 'new-password';

  return (
    <div className={classes['form-container']}>
      <h1>Posts Demo</h1>

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

        {!isLogin && (
          <div className={classes['user-info']}>
            <input type='text' placeholder='Name' ref={nameInputRef} />
            <input type='text' placeholder='Lastname' ref={lastnameInputRef} />
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
