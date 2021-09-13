import { useContext, useRef } from 'react';
import classes from './NewPost.module.css';
import AuthContext from '../../store/auth-context';
import { addDocument, updateDocument } from '../../firebaseActions';

const NewPost = ({ edit, onFinishEditing }) => {
  const postRef = useRef();
  const authCtx = useContext(AuthContext);

  if (edit) {
    postRef.current.value = edit.text;
  }

  const savePostHandler = async (isPrivate) => {
    const post = postRef.current.value;

    if (post.trim().length === 0) {
      alert('Post must not be empty');
      return;
    }

    let collection = 'posts';

    if (edit) {
      if (edit.isPrivate) collection = 'private-posts';
      await updateDocument(
        `users/${authCtx.userId}/${collection}/${edit.id}`,
        post
      );
      onFinishEditing();
    } else {
      if (isPrivate === true) collection = 'private-posts';
      await addDocument(`users/${authCtx.userId}/${collection}`, {
        text: post,
        timestamp: new Date().getTime(),
        author: authCtx.userName,
        likes: {
          counter: 0,
          users: [],
        },
        author_id: authCtx.userId,
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

      <button className='btn' onClick={savePostHandler}>
        {edit ? 'Confirm edit' : 'Share'}
      </button>

      {!edit && (
        <button className='btn' onClick={savePostHandler.bind(null, true)}>
          Save as private
        </button>
      )}
      {edit && (
        <button className='btn' onClick={cancelEditingHandler}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default NewPost;
