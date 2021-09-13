import { useLocation } from 'react-router';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import { deleteDocument, modifyLikes } from '../../firebaseActions';
import trashIcon from '../../assets/icons/trash.svg';
import heartEmptIcon from '../../assets/icons/heart-empty.svg';
import heartFullIcon from '../../assets/icons/heart-full.svg';
import classes from './PostItem.module.css';

const PostItem = ({ data, onEdit, isPrivate }) => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const userLiked = data.likes.users.includes(userId);

  const location = useLocation();

  const deletePostHandler = () => {
    const collection = isPrivate ? 'private-posts' : 'posts';
    deleteDocument(`users/${userId}/${collection}/${data.id}`);
  };

  const startEditingHandler = () => {
    onEdit({ text: data.text, id: data.id, isPrivate });
  };

  const likeHandler = () => {
    if (!authCtx.isLoggedIn) return;

    const type = userLiked ? null : 'like';
    modifyLikes(
      `users/${data.author_id}/posts/${data.id}`,
      userId,
      data.likes.counter,
      data.likes.users,
      type
    );
  };

  const inGeneral = location.pathname === '/general';

  console.log(data.likes);

  return (
    <li className={classes.post}>
      <div>
        {inGeneral && <span>{data.author} &nbsp;</span>}
        <span>{new Date(data.timestamp).toLocaleString()}</span>

        {!inGeneral && (
          <div className={classes.actions}>
            <button onClick={startEditingHandler}>edit</button>
            <img onClick={deletePostHandler} src={trashIcon} alt='trash-icon' />
          </div>
        )}
      </div>

      <div>
        <span>{data.text}</span>
      </div>

      {!isPrivate && (
        <div>
          <img
            onClick={likeHandler}
            src={userLiked ? heartFullIcon : heartEmptIcon}
            alt='empty-heart-icon'
          />
          <span>{data.likes.counter} likes</span>
        </div>
      )}
    </li>
  );
};

export default PostItem;
