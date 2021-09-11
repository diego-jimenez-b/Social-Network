import { useContext, useRef } from 'react';
import classes from './NewPost.module.css';
import AuthContext from '../../store/auth-context';
import Button from '../UI/Button';
import { addDocument, updateDocument } from '../../firebaseActions';

const NewPost = ({ edit, onFinishEditing }) => {
  const postRef = useRef();
  const authCtx = useContext(AuthContext);

  if (edit) {
    postRef.current.value = edit.text;
  }

  const savePostHandler = async () => {
    const post = postRef.current.value;

    if (post.trim().length === 0) {
      alert('Post must not be empty');
      return;
    }

    if (edit) {
      await updateDocument(`users/${authCtx.userId}/posts/${edit.id}`, post);
      onFinishEditing();
    } else {
      await addDocument(`users/${authCtx.userId}/posts`, {
        text: post,
        timestamp: new Date().getTime(),
        author: authCtx.userName,
      });
    }

    postRef.current.value = '';
  };

  const cancelEditingHandler = () => {
    onFinishEditing();
    postRef.current.value = '';
  };

  return (
    <div className={classes['new-post']}>
      <textarea placeholder='What do you want to share?' ref={postRef} />
      <Button onClick={savePostHandler}>
        {edit ? 'Confirm edit' : 'Share'}
      </Button>
      {edit && <Button onClick={cancelEditingHandler}>Cancel</Button>}
    </div>
  );
};

export default NewPost;
