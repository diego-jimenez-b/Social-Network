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

const PostsList = (props) => {
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isCollectionGroup, collPath, onEdit, isPrivate } = props;

  useEffect(() => {
    console.log('effect working');

    let q;
    if (isCollectionGroup) {
      q = query(collectionGroup(db, collPath));
    } else {
      q = query(collection(db, collPath));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot);
      const posts = [];
      querySnapshot.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));
      setPostsList(posts);
      setIsLoading(false);
    });

    return unsubscribe;
  }, [collPath, isCollectionGroup]);

  const sortedPosts = postsList.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className={classes.posts}>
      {isLoading && <p>Loading</p>}
      {!isLoading && postsList.length === 0 && <p>No posts found</p>}
      {!isLoading && postsList.length !== 0 && (
        <ul>
          {sortedPosts.map((post) => (
            <PostItem
              data={post}
              key={post.id}
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
