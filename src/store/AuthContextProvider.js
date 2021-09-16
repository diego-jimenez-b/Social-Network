import { useEffect, useState } from 'react';
import AuthContext from './auth-context';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useHistory } from 'react-router';
import { getUserInfo } from '../firebaseActions';

const initialUserState = {
  isLoggedIn: false,
  id: '',
  name: null,
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initialUserState);
  const [userChanges, setUserChanges] = useState(0);
  const history = useHistory();

  const auth = getAuth();

  useEffect(() => {
    // console.log('working');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUser = async () => {
          const userInfo = await getUserInfo(user.uid);
          setUser({
            isLoggedIn: true,
            id: user.uid,
            name: userInfo.fullname,
            profilePicture: userInfo.photo,
          });
        };
        getUser();
      }
    });
  }, [auth, userChanges]);

  const createNewUser = (email, password, name, lastname, fullname) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser({ isLoggedIn: true, id: userCredential.user.uid });
        return userCredential.user.uid;
      })
      .then((id) => {
        return setDoc(doc(db, 'users', id), {
          name,
          lastname,
          fullname,
          email,
        });
      })
      .then(() => {
        alert('You have succesfully created an account');
        history.push('/profile');
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
      .then(() => {
        history.push('/profile');
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
  const userChanged = () => {
    setUserChanges((prevState) => (prevState += 1));
  };

  const authContext = {
    isLoggedIn: user.isLoggedIn,
    userId: user.id,
    userName: user.name,
    profilePicture: user.profilePicture,
    createNewUser,
    login,
    logout,
    checkUserStatus,
    userChanged,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
