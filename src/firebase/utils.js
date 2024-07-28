import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the auth service
export const auth = getAuth(firebaseApp);

// Get a reference to the Firestore service
export const firestore = getFirestore(firebaseApp);

// Google Auth provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const { uid } = userAuth;
    const userRef = doc(firestore, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch (err) {
            console.log(err);
        }
    }

    return userRef;
};
