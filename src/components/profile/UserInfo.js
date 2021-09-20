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
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

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
    setIsLoading(true);

    let newImageUrl;

    await uploadImage(`users/${authCtx.userId}/profile-image`, selectedFile);
    await getImageUrl(`users/${authCtx.userId}/profile-image`, (url) => {
      newImageUrl = url;
    });
    await updateDocument(`users/${authCtx.userId}`, {
      photo: newImageUrl,
    });

    selectedFile = null;
    authCtx.pictureChange(newImageUrl);
    setShowConfig(false);
    setIsLoading(false);

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const cancelChange = () => {
    selectedFile = null;
    setImage(initialPicture);
    setShowConfig(false);
  };

  const selectFile = () => {
    document.getElementById('file-input').click();
  };

  const btnClasses = isLoading ? 'btn disabled' : 'btn';

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
      {showMessage && (
        <span className={classes.message}>
          Your profile picture has been changed, you might need to refresh the
          page to visualize this change
        </span>
      )}

      {showConfig && (
        <div className={classes.config}>
          <input
            type='file'
            onChange={fileInputHandler}
            accept='image/*'
            id='file-input'
          />

          <button
            className={btnClasses}
            onClick={selectFile}
            disabled={isLoading}
          >
            change profile picture
          </button>

          {selectedFile && (
            <div className={classes['action-btns']}>
              <button
                className={btnClasses}
                onClick={changeProfileImage}
                disabled={isLoading}
              >
                Confirm
              </button>
              <button
                className={btnClasses}
                onClick={cancelChange}
                disabled={isLoading}
              >
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
