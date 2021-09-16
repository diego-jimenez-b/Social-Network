import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  userName: '',
  profilePicture: '',
  createNewUser: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export default AuthContext;