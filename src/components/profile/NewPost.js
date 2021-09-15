import { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../store/auth-context';
import {
  addDocument,
  updateDocument,
  uploadImage,
} from '../../firebaseActions';
import classes from './NewPost.module.css';

const NewPost = ({ edit, onFinishEditing }) => {
  const [editImg, setEditImg] = useState(null);
  const [file, setFile] = useState(null);

  console.log('new post executed');

  useEffect(() => {
    console.log('effect working');
    if (edit && edit.image) setEditImg(edit.image);
    if (!edit) {
      setEditImg(null);
    }
    setFile(null);
  }, [edit]);

  const authCtx = useContext(AuthContext);
  const postRef = useRef();
  const fileInputRef = useRef();

  if (edit) {
    postRef.current.value = edit.text;
  }

  const fileSelectHandler = (event) => {
    const currentFile = event.target.files[0];

    if (event.target.files && currentFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditImg(e.target.result);
        setFile(currentFile);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      resetNewPost(true);
    }
  };

  const savePostHandler = async (isPrivate) => {
    const post = postRef.current.value;

    if (post.trim().length === 0) {
      alert('Post must not be empty');
      return;
    }

    let collection = 'posts';
    if (edit) {
      if (edit.isPrivate) collection = 'private-posts';

      let newImageUrl;
      if (file) {
        newImageUrl = `users/${authCtx.userId}/${collection}/${file.name}`;
        await uploadImage(newImageUrl, file);
      }

      await updateDocument(
        `users/${authCtx.userId}/${collection}/${edit.id}`,
        post,
        !editImg ? editImg : file ? newImageUrl : null,
        edit.image_local
      );

      onFinishEditing();
    } else {
      if (isPrivate === true) collection = 'private-posts';

      if (file) {
        console.log('file uploaded');
        await uploadImage(`users/${authCtx.userId}/${file.name}`, file);
      }

      await addDocument(`users/${authCtx.userId}/${collection}`, {
        text: post,
        timestamp: new Date().getTime(),
        author: authCtx.userName,
        likes: {
          counter: 0,
          users: [],
        },
        author_id: authCtx.userId,
        image: file ? `users/${authCtx.userId}/${file.name}` : null,
      });
    }

    resetNewPost();
  };

  const cancelEditingHandler = () => {
    onFinishEditing();
    postRef.current.value = '';
  };

  const removeImageHandler = () => {
    if (edit) {
      setEditImg(false);
    } else {
      resetNewPost(true);
    }
  };

  const resetNewPost = async (onlyImage) => {
    setFile(null);
    setEditImg(null);
    fileInputRef.current.value = null;

    if (!onlyImage) {
      postRef.current.value = '';
    }
  };

  return (
    <div className={classes['new-post']}>
      {editImg && (
        <div className={classes['edit-img']}>
          <img src={editImg} alt='post' />
          <button onClick={removeImageHandler}>Remove image</button>
        </div>
      )}

      <textarea placeholder='What do you want to share?' ref={postRef} />

      <div className={classes.actions}>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={fileSelectHandler}
        />

        <div>
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
      </div>
    </div>
  );
};

export default NewPost;
