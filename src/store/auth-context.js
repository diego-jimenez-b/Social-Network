import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  userName: '',
  createNewUser: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export default AuthContext;