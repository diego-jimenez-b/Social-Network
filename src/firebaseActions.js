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
