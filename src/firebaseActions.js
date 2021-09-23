import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  collection,
} from 'firebase/firestore';
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from './firebase';
import { db } from './firebase';

export const addDocument = async (path, obj) => {
  await addDoc(collection(db, path), obj);
};

export const deleteDocument = (path) => {
  deleteDoc(doc(db, path));
};

export const updateDocument = async (path, obj) => {
  await updateDoc(doc(db, path), obj);
};

export const updatePost = async (path, text, newImg, prevImg, newImgLocal) => {
  let updatedObj = { text };

  if (newImg === false || (newImg && prevImg)) {
    updatedObj = {
      text,
      image: newImg ? newImg : null,
      image_local: newImgLocal ? newImgLocal : null,
    };
    removeImage(prevImg);
  }

  if (newImg && !prevImg) {
    updatedObj = { text, image: newImg, image_local: newImgLocal };
  }

  await updateDoc(doc(db, path), updatedObj);
};

export const uploadImage = async (path, file) => {
  const imgRef = ref(storage, path);
  await uploadBytes(imgRef, file);
};

export const removeImage = (path) => {
  const imgRef = ref(storage, path);
  deleteObject(imgRef);
};

export const getImageUrl = async (path, action) => {
  const url = await getDownloadURL(ref(storage, path));
  action(url);
};

export const modifyLikes = (path, id, currentNum, currentUsers, type) => {
  if (type === 'like' && currentUsers.includes(id)) return;
  if (!type && !currentUsers.includes(id)) return;

  let updatedUsers = [...currentUsers];
  if (type === 'like') {
    updatedUsers.push(id);
  } else {
    updatedUsers = updatedUsers.filter((user) => user !== id);
  }

  let data = {
    likes: {
      counter: type === 'like' ? currentNum + 1 : currentNum - 1,
      users: updatedUsers,
    },
  };

  updateDoc(doc(db, path), data);
};

export const getUserInfo = async (userId) => {
  const docSnap = await getDoc(doc(db, 'users', userId));
  return docSnap.data();
};
