import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7BCm-0dBGHvPJPd7By8dD99WwXerbPbs",
  authDomain: "social-project-f4800.firebaseapp.com",
  projectId: "social-project-f4800",
  storageBucket: "social-project-f4800.appspot.com",
  messagingSenderId: "903970892258",
  appId: "1:903970892258:web:81b7d4987b8acf5c0131bb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
