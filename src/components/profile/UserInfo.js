import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import {
  getImageUrl,
  updateDocument,
  uploadImage,
} from '../../firebaseActions';

import profileImg from '../../assets/icons/profile-user.svg';
import configIcon from '../../assets/icons/gear.svg';
import classes from './UserInfo.module.css';

let selectedFile = null;
let initialPicture;

const UserInfo = () => {
  const authCtx = useContext(AuthContext);
  const [showConfig, setShowConfig] = useState(false);
  const [image, setImage] = useState(null);

  const { profilePicture: photo } = authCtx;
  useEffect(() => {
    if (photo) {
      setImage(photo);
      initialPicture = photo;
    } else {
      setImage(profileImg);
      initialPicture = profileImg;
    }

    return (selectedFile = null);
  }, [photo]);

  const toggleConfigHandler = () => setShowConfig((prevState) => !prevState);

  const fileInputHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      selectedFile = null;

      setImage(initialPicture);
    }
  };

  const changeProfileImage = async () => {
    let newImageUrl;
    await uploadImage(`users/${authCtx.userId}/profile-image`, selectedFile);
    await getImageUrl(`users/${authCtx.userId}/profile-image`, (url) => {
      newImageUrl = url;
    });
    updateDocument(`users/${authCtx.userId}`, {
      photo: newImageUrl,
    });

    selectedFile = null;
    authCtx.userChanged();
    setShowConfig(false);
  };
  const cancelChange = () => {
    selectedFile = null;
    setImage(initialPicture);
    setShowConfig(false);
  };

  const selectFile = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className={classes.info}>
      <img
        onClick={toggleConfigHandler}
        className={classes['config-icon']}
        src={configIcon}
        alt='configurate'
      />

      {image && (
        <img src={image} className={classes['profile-img']} alt='profile' />
      )}
      <h3>{authCtx.userName}</h3>

      {showConfig && (
        <div className={classes.config}>
          <input
            type='file'
            onChange={fileInputHandler}
            accept='image/*'
            id='file-input'
          />

          <button className='btn' onClick={selectFile}>
            change profile picture
          </button>
          {selectedFile && (
            <div className={classes['action-btns']}>
              <button className='btn' onClick={changeProfileImage}>
                Confirm
              </button>
              <button className='btn' onClick={cancelChange}>
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
