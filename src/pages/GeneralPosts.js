import classes from './GeneralPosts.module.css';

import { Fragment } from 'react';
import PostsList from '../components/posts-list/PostsList';

const GeneralPosts = () => {
  return (
    <Fragment>
      <h1 className={classes.title}>General Posts</h1>
      <div className={classes.posts}>
        <PostsList isCollectionGroup={true} collPath={'posts'} />
      </div>
    </Fragment>
  );
};

export default GeneralPosts;
