// coolproject/js/auth.js
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db } from './firebase-init.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();

// 🌌 Cosmic Authentication Functions

export const cosmicSignUp = async (email, password, username) => {
  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // 2. Update profile with username
    await updateProfile(userCredential.user, {
      displayName: username
    });

    // 3. Create user document in Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username,
      email,
      bio: "✨ New cosmic traveler",
      avatar: generateCosmicAvatar(email),
      links: [],
      createdAt: new Date(),
      stardust: 100 // Starting cosmic currency
    });

    return userCredential.user;

  } catch (error) {
    throw transformStellarError(error);
  }
};

export const cosmicLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw transformStellarError(error);
  }
};

export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if user is new
    if (result._tokenResponse.isNewUser) {
      await setDoc(doc(db, "users", result.user.uid), {
        username: result.user.displayName || result.user.email.split('@')[0],
        email: result.user.email,
        bio: "🌠 Google cosmic traveler",
        avatar: result.user.photoURL || generateCosmicAvatar(result.user.email),
        links: [],
        createdAt: new Date(),
        stardust: 150 // Bonus for Google users
      });
    }
    
    return result.user;
  } catch (error) {
    throw transformStellarError(error);
  }
};

export const cosmicLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw transformStellarError(error);
  }
};

// 🌟 Helper Functions

const generateCosmicAvatar = (seed) => {
  // Generate deterministic cosmic avatar based on email
  const colors = ['#b388ff', '#00e5ff', '#7c4dff', '#ff4d8d', '#00ffaa'];
  const color = colors[Math.abs(hashCode(seed)) % colors.length];
  return `https://api.dicebear.com/8.x/identicon/svg?seed=${seed}&backgroundColor=${color.substring(1)}`;
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const transformStellarError = (error) => {
  const errorMap = {
    'auth/email-already-in-use': 'This stardust address is already warping through the cosmos',
    'auth/invalid-email': 'Invalid cosmic coordinates (email format)',
    'auth/weak-password': 'Your quantum shield needs at least 6 particles',
    'auth/user-not-found': 'No celestial being found with these coordinates',
    'auth/wrong-password': 'Incorrect cosmic passphrase',
    'auth/too-many-requests': 'The universe needs a break - try again later',
    'auth/popup-closed-by-user': 'Portal closed before completion'
  };

  return {
    code: error.code,
    message: errorMap[error.code] || 'A cosmic disturbance occurred',
    original: error
  };
};

// 🛸 Real-time Auth State Listener
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      // Add cosmic metadata to user object
      user.cosmicData = {
        avatar: generateCosmicAvatar(user.email),
        stardust: 0 // Will be updated from Firestore
      };
    }
    callback(user);
  });
};