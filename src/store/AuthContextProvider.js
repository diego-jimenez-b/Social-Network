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
  username: null,
};

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(initialUserState);
  const history = useHistory();

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const getUser = async () => {
          const userInfo = await getUserInfo(user.uid);
          setUser({
            isLoggedIn: true,
            id: user.uid,
            username: userInfo.username,
            profilePicture: userInfo.photo,
          });
        };
        getUser();
      }
    });
  }, [auth]);

  const createNewUser = (email, password, username) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUser({ isLoggedIn: true, id: userCredential.user.uid });
        return userCredential.user.uid;
      })
      .then((id) => {
        return setDoc(doc(db, 'users', id), {
          username,
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
  const pictureChange = (updatedPhoto) => {
    setUser((prevState) => ({ ...prevState, profilePicture: updatedPhoto }));
  };

  const authContext = {
    isLoggedIn: user.isLoggedIn,
    userId: user.id,
    username: user.username,
    profilePicture: user.profilePicture,
    createNewUser,
    login,
    logout,
    checkUserStatus,
    pictureChange,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
