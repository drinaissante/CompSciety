import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
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

export async function authFetchAvatarURL(username) {
  if (!auth || !auth.currentUser) return "N/A";
  
  const CACHE_KEY = `${auth.currentUser.uid}-avatar`;

  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const parsed = JSON.parse(cached);
    return parsed.avatarUrl;
  }

  // not cached

  const avatarUrl = await fetchAvatarURL(username);

  if (avatarUrl !== "N/A") {
    localStorage.setItem(CACHE_KEY, 
      JSON.stringify({
        avatarUrl: avatarUrl
      })
    );

    return avatarUrl;
  }

  return "N/A";
}

export async function fetchAvatarURL(username, {setError} = {}) {
  try {
    const q = query(collection(db, "discord"), where("username", "==", username)); 
    const snap = await getDocs(q);

    if (!snap.empty) {
      const userDoc = snap.docs[0];
      const url = userDoc.data().avatarURL;
      return url;
    }
  } catch (err) {
    if (setError) {
      const errMsg = getFirebaseAuthErrorMessage(err);
      setError(errMsg);
    } else {
      console.error(err);
    }
  }

  return "N/A";
}

export async function fetchProfileURL() {
  if (!auth || !auth.currentUser) return null;

  const CACHE_KEY = `${auth.currentUser.uid}`;
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (cached) {
    const parsed = JSON.parse(cached);
    return parsed.data.profile_link;
  } else {
    const data = await fetchProfileDetails();

    return data.profile_link;
  }
}

export async function fetchProfileDetails() {
  if (!auth || !auth.currentUser) return null;

  const CACHE_KEY = `${auth.currentUser.uid}`;
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const parsed = JSON.parse(cached);
    return parsed.data;
  }

  try {
    const user = auth.currentUser;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      const data = snap.data();

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: data
        })
      )

      return data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}