// js/auth.js

// Import required functions from the Firebase Auth SDK
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Optionally import Firestore for user profile info (uncomment if needed)
// import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// import { app } from './firebase-init.js'; // If you export app from firebase-init

const auth = getAuth();
// const db = getFirestore(); // if needed

// SIGN UP with email and password
export async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Optionally update the user display name
    if (username) {
      await updateProfile(user, { displayName: username });
    }
    // Optionally, save user info to Firestore
    // await setDoc(doc(db, "users", user.uid), {
    //   email,
    //   username,
    //   createdAt: new Date()
    // });
    return user;
  } catch (error) {
    // Pass error object so caller can display error message
    throw error;
  }
}

// LOGIN with email and password
export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// LOGOUT the current user
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

// AUTH STATE: call a callback with the user or null on user state change
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// Utility: Get current user (optional)
export function getCurrentUser() {
  return auth.currentUser;
}
