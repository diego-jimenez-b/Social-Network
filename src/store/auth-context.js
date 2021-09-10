import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userId: '',
  createNewUser: (email, password) => {},
  login: (email, password) => {},
  logout: () => {},
});

export default AuthContext;