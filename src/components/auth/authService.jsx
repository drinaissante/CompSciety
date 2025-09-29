import { auth, getFirebaseAuthErrorMessage } from "./firebase.jsx";

import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    return result;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);

    return result;
};

const provider = new GoogleAuthProvider();

export const doSignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    return result;
};

export const doSignOut = async () => {
    const result = await auth.signOut();

    return result;
};

// EXTRAS ??

export const doPasswordReset = async (email) => {
    const result = await sendPasswordResetEmail(auth, email, {
        url: "https://drinaissante.github.io/CompSciety/resetpassword", // make sure to have this set to vercel once vercel is in production
        handleCodeInApp: true,
    });

    return result;
}

export const doPasswordChange = (password) => {
    const result = updatePassword(auth.currentUser, password);

    return result;
}

export const doSendEmailVerification = () => {
    const result =  sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`
    });

    return result;
};