import { useLocation } from 'react-router';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import {
  deleteDocument,
  modifyLikes,
  removeImage,
} from '../../firebaseActions';

import trashIcon from '../../assets/icons/trash.svg';
import heartEmptIcon from '../../assets/icons/heart-empty.svg';
import heartFullIcon from '../../assets/icons/heart-full.svg';
import profileImg from '../../assets/icons/profile-user.svg';
import classes from './PostItem.module.css';

const PostItem = ({ data, onEdit, isPrivate }) => {
  const authCtx = useContext(AuthContext);

  const {
    text,
    id,
    image,
    image_local,
    likes,
    author_id,
    author,
    timestamp,
    author_photo,
  } = data;

  const userId = authCtx.userId;
  const userLiked = data.likes.users.includes(userId);

  const location = useLocation();

  const deletePostHandler = () => {
    const collection = isPrivate ? 'private-posts' : 'posts';
    deleteDocument(`users/${userId}/${collection}/${id}`);
    if (image) {
      removeImage(image_local);
    }
  };

  const startEditingHandler = () => {
    onEdit({ text, id, image, isPrivate, image_local });
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
        {image && <img id='post-image' src={image} alt='post' />}
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
