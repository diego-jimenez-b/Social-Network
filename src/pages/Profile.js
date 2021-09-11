import UserInfo from '../components/profile/UserInfo';
import NewPost from '../components/profile/NewPost';
import classes from './Profile.module.css';
import PostsList from '../components/posts-list/PostsList';
import { useContext, useState } from 'react';
import AuthContext from '../store/auth-context';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [editing, setEditing] = useState(null);

  const editPostHandler = (post) => setEditing(post);
  const finishEditingHandler = () => setEditing(null);

  return (
    <div className={classes.profile}>
      <UserInfo />
      <div className={classes.posts}>
        <NewPost edit={editing} onFinishEditing={finishEditingHandler} />
        <PostsList
          collPath={`users/${authCtx.userId}/posts`}
          userId={authCtx.userId}
          onEdit={editPostHandler}
        />
      </div>
    </div>
  );
};

export default Profile;
