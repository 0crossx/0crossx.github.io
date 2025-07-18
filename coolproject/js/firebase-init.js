// This goes in a dedicated config file or at the top of your main JS
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
// Optionally import other Firebase services as needed:
// import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1ilMMW6LCTO8eGyKwAD5nPbJLdDiu6DA",
  authDomain: "linkinbio-f70b1.firebaseapp.com",
  databaseURL: "https://linkinbio-f70b1.firebaseio.com", // Optional, add if you use Realtime Database
  projectId: "linkinbio-f70b1",
  storageBucket: "linkinbio-f70b1.appspot.com",
  messagingSenderId: "67493439213",
  appId: "1:67493439213:web:199390d82cf9b2d99c0ee4",
  measurementId: "G-5JFLHJECR7" // Optional, for Google Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize other services as needed, for example:
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

export { app, analytics /*, auth, db, storage */ };
