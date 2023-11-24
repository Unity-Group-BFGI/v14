import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from '../../configrations/Firebase.config';

let authError = false;
const firebaseApp = initializeApp(firebaseConfig);
try{
    let authTest = getAuth(firebaseApp);
}catch(err){
    authError = true;
}
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
export {auth, googleAuthProvider, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, authError };