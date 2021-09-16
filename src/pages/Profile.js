import { useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import UserInfo from '../components/profile/UserInfo';
import NewPost from '../components/profile/NewPost';
import PostsList from '../components/posts-list/PostsList';

import arrowImg from '../assets/icons/down-arrow.svg';
import classes from './Profile.module.css';

const Profile = () => {
  const [editing, setEditing] = useState(null);
  const [publicPosts, setPublicPosts] = useState(true);
  const [privatePosts, setPrivatePosts] = useState(false);
  const authCtx = useContext(AuthContext);

  const editPostHandler = (post) => setEditing(post);
  const finishEditingHandler = () => setEditing(null);

  const togglePublicPosts = () => setPublicPosts((prevState) => !prevState);
  const togglePrivatePosts = () => setPrivatePosts((prevState) => !prevState);

  return (
    <div className={classes.profile}>
      <UserInfo />
      
      <div className={classes.posts}>
        <NewPost edit={editing} onFinishEditing={finishEditingHandler} />

        <section className={classes['posts-section']}>
          <img
            src={arrowImg}
            onClick={togglePublicPosts}
            style={{ transform: publicPosts ? 'rotate(-90deg)' : '' }}
            alt='arrow-icon'
          />
          <h2>Public posts</h2>

          {publicPosts && (
            <PostsList
              collPath={`users/${authCtx.userId}/posts`}
              userId={authCtx.userId}
              onEdit={editPostHandler}
              isPrivate={false}
            />
          )}
        </section>

        <section className={classes['posts-section']}>
          <img
            src={arrowImg}
            onClick={togglePrivatePosts}
            style={{ transform: privatePosts ? 'rotate(-90deg)' : '' }}
            alt='arrow-icon'
          />
          <h2>Private posts</h2>

          {privatePosts && (
            <PostsList
              collPath={`users/${authCtx.userId}/private-posts`}
              onEdit={editPostHandler}
              isPrivate={true}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
