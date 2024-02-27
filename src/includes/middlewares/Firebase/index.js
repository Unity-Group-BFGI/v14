import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification 
} from "firebase/auth";
let authError = false;

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

try{
    let authTest = getAuth(firebaseApp);
} catch(err) {
    authError = true;
}
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
export {
    auth, 
    googleAuthProvider, 
    onAuthStateChanged, 
    signOut, 
    signInWithPopup, 
    GoogleAuthProvider, 
    authError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification 
};