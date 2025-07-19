import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {/* YOUR FIREBASE CONFIG */};
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');

async function isUsernameAvailable(username) {
  const qs = query(collection(db, "users"), where("username", "==", username));
  const snap = await getDocs(qs);
  return snap.empty;
}
function showError(msg) {
  signupError.textContent = msg || "";
}

signupForm.onsubmit = async (e) => {
  e.preventDefault();
  showError("");
  signupForm.querySelector("button").disabled = true;
  const username = signupForm.signupUsername.value.trim().toLowerCase();
  const email = signupForm.signupEmail.value.trim();
  const password = signupForm.signupPassword.value;
  if (!/^[a-zA-Z0-9_-]{2,24}$/.test(username)) {
    showError("Username can use letters, numbers, dashes/underscores only!");
    signupForm.querySelector("button").disabled = false;
    return;
  }
  if (!(await isUsernameAvailable(username))) {
    showError("That username is already taken.");
    signupForm.querySelector("button").disabled = false;
    return;
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      username,
      bio: "",
      avatar: "",
      links: [],
    });
    await updateProfile(cred.user, { displayName: username });
    window.location = "dashboard.html";
  } catch (e) {
    showError(e.message || "Signup failed.");
    signupForm.querySelector("button").disabled = false;
  }
};
