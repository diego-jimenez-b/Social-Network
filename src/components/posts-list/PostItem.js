import { useLocation } from 'react-router';
import { deleteDocument } from '../../firebaseActions';
import classes from './PostItem.module.css';

const PostItem = ({ data, userId, onEdit }) => {
  const location = useLocation();

  const deletePostHandler = () => {
    deleteDocument(`users/${userId}/posts/${data.id}`);
  };
  const startEditingHandler = () => {
    onEdit({ text: data.text, id: data.id });
  };

  const inGeneral = location.pathname === '/general';

  return (
    <li className={classes.post}>
      {userId && <button onClick={deletePostHandler}>del</button>}
      {!inGeneral && onEdit && (
        <button onClick={startEditingHandler}>edit</button>
      )}
      <div>
        {inGeneral && <span>{data.author} &nbsp;</span>}
        <span>{new Date(data.timestamp).toLocaleString()}</span>
      </div>
      <div>
        <span>{data.text}</span>
      </div>
    </li>
  );
};

export default PostItem;
