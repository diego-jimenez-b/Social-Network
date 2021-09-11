// import { collectionGroup, query, onSnapshot } from 'firebase/firestore';
// import { useContext, useEffect } from 'react';
// import { db } from '../firebase';
// import AuthContext from '../store/auth-context';
import classes from './GeneralPosts.module.css';

import { Fragment } from 'react';
import PostsList from '../components/posts-list/PostsList';

const GeneralPosts = () => {
  // const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   console.log('effect working');

  //   const q = query(collectionGroup(db, 'posts'));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     // const posts = [];
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data(), doc.id);
  //     });
  //     // setPostsList(posts);
  //   });

  //   return unsubscribe;
  // }, []);

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
