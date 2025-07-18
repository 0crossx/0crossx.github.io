// Sign Up
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').onsubmit = function(e) {
    e.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value;
    const username = signupUsername.value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => db.collection('users').doc(cred.user.uid).set({
        username, email, bio: "", avatar: "", links: []
      }))
      .then(() => window.location = "dashboard.html")
      .catch(err => alert(err.message));
  };
}

// Log In
if(document.getElementById('loginForm')) {
  document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => window.location = "dashboard.html")
      .catch(err => alert(err.message));
  };
}
