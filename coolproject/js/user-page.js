// Parse username from URL, fetch from Firestore, and inject elements as shown...
const username = new URLSearchParams(location.search).get('username');
// fetch user doc by username, using firestore...
// Example result:
const user = {
  avatar: "...",
  username: "zainematics",
  bio: "...",
  links: [
    {title:"Instagram",url:"https://insta.com/...",icon:"instagram"},
    ...
  ]
};
// Then:
document.getElementById('pubUsername').textContent = '@'+user.username;
document.getElementById('pubAvatar').src = user.avatar;
document.getElementById('pubBio').textContent = user.bio || '';
user.links.forEach(link=>{
  // create li with .pub-link-item, .pub-link-icon (add via SVG or emoji), .pub-link-btn
});
