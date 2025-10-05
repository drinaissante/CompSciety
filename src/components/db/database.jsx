import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db, getFirebaseAuthErrorMessage } from "../auth/firebase.jsx"

import { auth } from "../auth/firebase.jsx";

export async function createUserDocument(profileData, {setErrors}) {
  const user = auth.currentUser;
  
  // get fresh token to ensure it's valid
  try {
    await user.getIdToken(true);
  } catch (err) {
    const errMsg = getFirebaseAuthErrorMessage(err);
    setErrors((prev) => ({...prev, auth: errMsg}));
  }
  
  // create document reference
  const userDocRef = doc(db, "users", user.uid);
  
  const docData = {
    uid: user.uid,
    ...profileData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  try {
    await setDoc(userDocRef, docData);
    console.log("Created");

    return user.uid;
    
  } catch (err) {
    const errMsg = getFirebaseAuthErrorMessage(err);
    setErrors((prev) => ({...prev, auth: errMsg}));
  }
}

export async function fetchAvatarURL(username, {setError}) {
  try {
    const q = query(collection(db, "discord"), where("username", "==", username)); 

    const snap = await getDocs(q);

    if (!snap.empty) {
      const userDoc = snap.docs[0];
      const url = userDoc.data().avatarURL;
      return url;
    }

    return "N/A";
  } catch (err) {
    const errMsg = getFirebaseAuthErrorMessage(err);
    setError(errMsg);
  }
}