import { useContext } from 'react';
// import { db } from '../../firebase';
// import { doc, getDoc } from '@firebase/firestore';
import AuthContext from '../../store/auth-context';
import classes from './UserInfo.module.css';

const UserInfo = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes.info}>
      <h3>{authCtx.userName}</h3>
    </div>
  );
};

export default UserInfo;
