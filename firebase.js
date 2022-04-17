import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAxujYIOACnFOhGEV38TDOZ1golCZanQ-o",
	authDomain: "netflix-copy-e1d15.firebaseapp.com",
	projectId: "netflix-copy-e1d15",
	storageBucket: "netflix-copy-e1d15.appspot.com",
	messagingSenderId: "267121356942",
	appId: "1:267121356942:web:39c46d8230dc67d6c7d9df",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
