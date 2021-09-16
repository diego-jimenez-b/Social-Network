import { useLocation } from 'react-router';
import AuthContext from '../../store/auth-context';
import { useContext, useEffect, useState } from 'react';
import {
  deleteDocument,
  getImageUrl,
  modifyLikes,
  removeImage,
} from '../../firebaseActions';

import trashIcon from '../../assets/icons/trash.svg';
import heartEmptIcon from '../../assets/icons/heart-empty.svg';
import heartFullIcon from '../../assets/icons/heart-full.svg';
import profileImg from '../../assets/icons/profile-user.svg';
import classes from './PostItem.module.css';

const PostItem = ({ data, onEdit, isPrivate }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const authCtx = useContext(AuthContext);

  const { text, id, image, likes, author_id, author, timestamp, author_photo } =
    data;
  const userId = authCtx.userId;
  const userLiked = data.likes.users.includes(userId);

  console.log(author_photo);

  const location = useLocation();

  const deletePostHandler = () => {
    const collection = isPrivate ? 'private-posts' : 'posts';
    deleteDocument(`users/${userId}/${collection}/${id}`);
    if (image) {
      removeImage(image);
    }
  };

  const startEditingHandler = () => {
    onEdit({ text, id, image: imgUrl, isPrivate, image_local: image });
  };

  const likeHandler = () => {
    if (!authCtx.isLoggedIn) return;

    const type = userLiked ? null : 'like';
    modifyLikes(
      `users/${author_id}/posts/${id}`,
      userId,
      likes.counter,
      likes.users,
      type
    );
  };

  useEffect(() => {
    if (image) {
      getImageUrl(image, (url) => setImgUrl(url));
    }
    if (!image) setImgUrl(null);
  }, [image]);

  const inGeneral = location.pathname === '/general';

  return (
    <li className={classes.post}>
      <div>
        {inGeneral && (
          <div className={classes['user-info']}>
            <div className={classes['profile-img']}>
              <img
                className={classes.img}
                src={author_photo ? author_photo : profileImg}
                alt='profile'
              />
            </div>
            <span>{author} &nbsp;</span>
          </div>
        )}
        <span>{new Date(timestamp).toLocaleString()}</span>

        {!inGeneral && (
          <div className={classes.actions}>
            <button onClick={startEditingHandler}>edit</button>
            <img onClick={deletePostHandler} src={trashIcon} alt='trash-icon' />
          </div>
        )}
      </div>

      <div>
        {imgUrl && <img id='post-image' src={imgUrl} alt='post' />}
        <span>{text}</span>
      </div>

      {!isPrivate && (
        <div>
          <img
            onClick={likeHandler}
            src={userLiked ? heartFullIcon : heartEmptIcon}
            alt='empty-heart-icon'
          />
          <span>{likes.counter} likes</span>
        </div>
      )}
    </li>
  );
};

export default PostItem;
