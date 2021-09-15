import { useEffect, useState } from 'react';
import AuthContext from './auth-context';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useHistory } from 'react-router';

const initialUserState = {
  isLoggedIn: false,
  id: '',
  name: null,
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initialUserState);
  const history = useHistory();

  const auth = getAuth();

  useEffect(() => {
    // console.log('working');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUser = async () => {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          const name = docSnap.data().fullname;
          setUser({ isLoggedIn: true, id: user.uid, name });
        };
        getUser();
      }
    });
  }, [auth]);

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

  const authContext = {
    isLoggedIn: user.isLoggedIn,
    userId: user.id,
    userName: user.name,
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
