import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, getFirebaseAuthErrorMessage } from "../auth/firebase.jsx"

import { auth } from "../auth/firebase.jsx";

export async function createUserDocument(profileData, {setErrors}) {
  const user = auth.currentUser;
  
  // Get fresh token to ensure it's valid
  try {
    await user.getIdToken(true);
  } catch (err) {
    const errMsg = getFirebaseAuthErrorMessage(err);
    setErrors((prev) => ({...prev, auth: errMsg}));
  }
  
  // Create document reference
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

  
  
