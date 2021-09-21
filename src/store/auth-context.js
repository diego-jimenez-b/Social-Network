import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  username: '',
  profilePicture: '',
  createNewUser: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export default AuthContext;