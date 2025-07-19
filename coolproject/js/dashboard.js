import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {/* YOUR FIREBASE CONFIG */};
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const usernameInput = document.getElementById("profileUsernameEdit");
const bioInput = document.getElementById("profileBioEdit");
const avatarInput = document.getElementById("profileAvatar");
const linksInput = document.getElementById("profileLinks");
const errorDiv = document.getElementById("profileError");

function showError(msg) {
  errorDiv.textContent = msg || "";
}
function fillUrl(username) {
  const url = `https://0crossx.github.io/coolproject/@${username}`;
  document.getElementById("publicProfileUrl").value = url;
  document.getElementById("copyProfileLink").onclick = () => {
    navigator.clipboard.writeText(url);
  };
}

onAuthStateChanged(auth, async user => {
  if (!user) return location = "login.html";
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return showError("Profile missing!");
  let data = docSnap.data();
  usernameInput.value = data.username || "";
  bioInput.value = data.bio || "";
  avatarInput.value = data.avatar || "";
  linksInput.value = (data.links || []).join("\n");
  fillUrl(data.username);
});

document.getElementById("profileForm").onsubmit = async (e) => {
  e.preventDefault();
  showError("");
  const user = auth.currentUser;
  if (!user) return (location = "login.html");
  const bio = bioInput.value.trim();
  const avatar = avatarInput.value.trim();
  const links = linksInput.value.split("\n").map(l=>l.trim()).filter(Boolean);
  try {
    await setDoc(doc(db,"users",user.uid), { bio, avatar, links }, { merge:true });
    showError("Profile updated!");
    setTimeout(()=>showError(""),1200);
  } catch(e) {
    showError("Save error: "+(e.message || e.code));
  }
};
document.getElementById("signOutBtn").onclick = async function() {
  await signOut(auth);
  location = "login.html";
};
