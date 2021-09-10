import { useState } from 'react';
import AuthContext from './auth-context';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const initialUserState = {
  isLoggedIn: false,
  id: '',
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initialUserState);

  const auth = getAuth();

  const createNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser({ isLoggedIn: true, id: userCredential.user.uid });
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser({ isLoggedIn: true, id: userCredential.user.uid });
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const logout = () => {
    auth.signOut();
    setUser(initialUserState);
  };

  const checkUserStatus = () => {
    console.log(auth.currentUser);
  };

  const authContext = {
    isLoggedIn: user.isLoggedIn,
    userId: user.id,
    createNewUser,
    login,
    logout,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
