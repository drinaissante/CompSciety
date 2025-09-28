import { auth, getFirebaseAuthErrorMessage } from "./firebase.jsx";

import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        return createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
};

export const doSignInWithEmailAndPassword = (email, password) => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
};

const provider = new GoogleAuthProvider();

export const doSignInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);

        return result;
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
};

export const doSignOut = () => {
    try {
        return auth.signOut();
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
};

// EXTRAS ??

export const doPasswordReset = async (email) => {
    try {
        const result = await sendPasswordResetEmail(auth, email, {
            url: "https://drinaissante.github.io/CompSciety/resetpassword", // make sure to have this set to vercel once vercel is in production
            handleCodeInApp: true,
        });

        return result;
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
}

export const doPasswordChange = (password) => {
    try {
        return updatePassword(auth.currentUser, password);
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
}

export const doSendEmailVerification = () => {
    try {
        return sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/home`
        });
    } catch (err) {
        const errMessage = getFirebaseAuthErrorMessage(err);
        console.log(errMessage);
    } finally {
        return null;
    }
};