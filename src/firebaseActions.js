import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
} from 'firebase/firestore';
import { ref, deleteObject, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import { db } from './firebase';

export const addDocument = async (path, obj) => {
  await addDoc(collection(db, path), obj);
};

export const deleteDocument = (path) => {
  deleteDoc(doc(db, path));
};

export const updateDocument = async (path, value, updatedImg, prevImg) => {
  console.log(updatedImg);

  let updatedObj = { text: value };

  if (updatedImg === false || (updatedImg && prevImg)) {
    updatedObj = { text: value, image: updatedImg ? updatedImg : null };
    removeImage(prevImg);
  }
  
  if (updatedImg && !prevImg) {
    updatedObj = { text: value, image: updatedImg };
  }

  console.log(updatedObj);

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
