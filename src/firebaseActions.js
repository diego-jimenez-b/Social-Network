import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
} from 'firebase/firestore';
import { db } from './firebase';

export const deleteDocument = (path) => {
  deleteDoc(doc(db, path));
};

export const updateDocument = async (path, value) => {
  await updateDoc(doc(db, path), {
    text: value,
  });
};

export const addDocument = async (path, obj) => {
  await addDoc(collection(db, path), obj);
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
