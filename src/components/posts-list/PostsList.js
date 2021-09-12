import { useEffect, useState } from 'react';
import PostItem from './PostItem';
import {
  collection,
  collectionGroup,
  query,
  onSnapshot,
} from 'firebase/firestore';
import classes from './PostsList.module.css';
import { db } from '../../firebase';

const PostsList = ({ isCollectionGroup, collPath, userId, onEdit, isPrivate }) => {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    console.log('effect working');

    let q;
    if (isCollectionGroup) {
      q = query(collectionGroup(db, collPath));
    } else {
      q = query(collection(db, collPath));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // console.log(querySnapshot);
      const posts = [];
      querySnapshot.forEach((doc) => {
        console.log(doc);
        posts.push({ ...doc.data(), id: doc.id })});
      setPostsList(posts);
    });

    return unsubscribe;
  }, [collPath, isCollectionGroup]);

  const sortedPosts = postsList.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className={classes.posts}>
      {postsList.length === 0 && <p>No posts found</p>}
      {postsList.length !== 0 && (
        <ul>
          {sortedPosts.map((post) => (
            <PostItem
              data={post}
              key={post.id}
              userId={userId}
              onEdit={onEdit}
              isPrivate={isPrivate}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostsList;
