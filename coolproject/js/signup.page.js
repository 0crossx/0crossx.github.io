import { signUp } from './auth.js';

const form = document.getElementById('signupForm');
const errorDiv = document.getElementById('signupError');
const btn = form.querySelector('button[type="submit"]');

// Helper to show error messages in a user-friendly way
function showError(msg) {
  errorDiv.textContent = msg || '';
}

// Reset error on input
['signupUsername', 'signupEmail', 'signupPassword'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => showError(''));
});

form.onsubmit = async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.textContent = 'Creating...';
  showError('');

  const email = form.signupEmail.value;
  const password = form.signupPassword.value;
  const username = form.signupUsername.value;

  try {
    await signUp(email, password, username);
    window.location = 'dashboard.html';
  } catch (err) {
    // Friendly error messaging based on Firebase codes [2][3]
    let msg = "Signup failed. Please try again.";
    if (err.code === "auth/email-already-in-use") {
      msg = "That email is already in use.";
    } else if (err.code === "auth/invalid-email") {
      msg = "Please enter a valid email address.";
    } else if (err.code === "auth/weak-password") {
      msg = "Password must be at least 6 characters.";
    }
    showError(msg);
  }
  btn.disabled = false;
  btn.textContent = 'Sign Up';
};
