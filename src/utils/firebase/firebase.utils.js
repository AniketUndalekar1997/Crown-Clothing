import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDulIt2furT_f4bTf4C42hVJpwYwecS9UA",
    authDomain: "crwn-clothing-db-8a7da.firebaseapp.com",
    projectId: "crwn-clothing-db-8a7da",
    storageBucket: "crwn-clothing-db-8a7da.appspot.com",
    messagingSenderId: "218894619421",
    appId: "1:218894619421:web:28aa08bc5456004d7387f4"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation={}
    ) => {
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);
    
    if (!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log("error in creating user", error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)return;

    return await createUserWithEmailAndPassword(auth, email,password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)return;

    return await signInWithEmailAndPassword(auth, email,password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);