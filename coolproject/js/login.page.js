// coolproject/js/login.page.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Use the same Firebase config as in other files
const firebaseConfig = {
  apiKey: "AIzaSyB1ilMMW6LCTO8eGyKwAD5nPbJLdDiu6DA",
  authDomain: "linkinbio-f70b1.firebaseapp.com",
  projectId: "linkinbio-f70b1",
  storageBucket: "linkinbio-f70b1.appspot.com",
  messagingSenderId: "67493439213",
  appId: "1:67493439213:web:199390d82cf9b2d99c0ee4",
  measurementId: "G-5JFLHJECR7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

function showError(message) {
  loginError.textContent = message;
  setTimeout(() => loginError.textContent = '', 3000);
}

// Login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = loginForm.loginEmail.value.trim();
  const password = loginForm.loginPassword.value;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Redirect to dashboard on successful login
    window.location.href = 'dashboard.html';
  } catch (error) {
    let errorMessage = 'Login failed. Please try again.';
    
    switch(error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many attempts. Try again later.';
        break;
    }
    
    showError(errorMessage);
    loginForm.querySelector('button').disabled = false;
  }
});