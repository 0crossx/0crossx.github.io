import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {/* YOUR FIREBASE CONFIG */};
initializeApp(firebaseConfig);
const db = getFirestore();

function getUsernameParam() {
  const m = window.location.search.match(/[?&]username=([\w_-]+)/i);
  return m ? m[1].toLowerCase() : "";
}
function linkIcon(url) {
  if (/instagram/.test(url)) return "📸";
  if (/twitter/.test(url)) return "🐦";
  if (/youtube/.test(url)) return "📺";
  if (/github/.test(url)) return "👾";
  if (/linktr?\.ee/.test(url)) return "🌿";
  if (/spotify/.test(url)) return "🎵";
  if (/discord/.test(url)) return "💬";
  if (/tiktok/.test(url)) return "🎬";
  if (/facebook/.test(url)) return "📘";
  if (/portfolio|behance|dribbble/.test(url)) return "🖌️";
  if (/mail|mailto:/.test(url)) return "✉️";
  return "🔗";
}

async function loadPublicUser(username) {
  if (!username) return;
  const q = query(collection(db, "users"), where("username", "==", username));
  const snap = await getDocs(q);
  if (snap.empty) {
    document.getElementById("pubUsername").textContent = "User Not Found";
    document.getElementById("pubBio").textContent = "";
    return;
  }
  const data = snap.docs[0].data();
  document.getElementById("pubUsername").textContent = "@" + data.username;
  document.getElementById("pubAvatar").src = data.avatar ? data.avatar : "https://api.dicebear.com/8.x/identicon/svg?seed=" + (data.username||"linkinbio");
  document.getElementById("pubBio").textContent = data.bio || "";
  const links = data.links || [];
  const ul = document.getElementById("pubLinks");
  ul.innerHTML = "";
  links.forEach(url => {
    let li = document.createElement("li");
    li.className = "pub-link-item";
    let span = document.createElement("span");
    span.className = "pub-link-icon";
    span.textContent = linkIcon(url);
    let a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "pub-link-btn";
    a.textContent = url.replace(/^https?:\/\//i, "").split(/[/?]/)[0];
    li.append(span,a);
    ul.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded",async ()=>{
  let username = getUsernameParam();
  await loadPublicUser(username);
});
