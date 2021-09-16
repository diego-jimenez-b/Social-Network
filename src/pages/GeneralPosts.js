import classes from './GeneralPosts.module.css';

import { Fragment } from 'react';
import PostsList from '../components/posts-list/PostsList';

const GeneralPosts = (props) => {
  return (
    <Fragment>
      {!props.isLoggedIn && (
        <div className={classes.message}>
          You are currently visualizing other people posts as a guest. Please
          login to like other people posts and make your own
        </div>
      )}

      <h1 className={classes.title}>General Posts</h1>
      <div className={classes.posts}>
        <PostsList isCollectionGroup={true} collPath={'posts'} />
      </div>
    </Fragment>
  );
};

export default GeneralPosts;
