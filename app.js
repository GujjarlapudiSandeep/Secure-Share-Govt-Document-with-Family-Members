// // firebase-config.js
// // Replace with your Firebase project configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();
// const storage = firebase.storage();

// app.js

// DOM Elements
const authContainer = document.getElementById("auth-container");
const dashboard = document.getElementById("dashboard");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");
const fileInput = document.getElementById("fileInput");
const uploadDocButton = document.getElementById("uploadDoc");
const docList = document.getElementById("docList");

// Authentication
auth.onAuthStateChanged((user) => {
  if (user) {
    authContainer.style.display = "none";
    dashboard.style.display = "block";
    loadDocuments(user.uid);
  } else {
    authContainer.style.display = "block";
    dashboard.style.display = "none";
  }
});

// Register User
registerButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => alert("Registered successfully!"))
    .catch((err) => alert(err.message));
});

// Login User
loginButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth
    .signInWithEmailAndPassword(email, password)
    .catch((err) => alert(err.message));
});

// Logout User
logoutButton.addEventListener("click", () => auth.signOut());

// Upload Document
uploadDocButton.addEventListener("click", () => {
  const file = fileInput.files[0];
  if (!file) return alert("No file selected.");

  const userId = auth.currentUser.uid;
  const storageRef = storage.ref(`${userId}/${file.name}`);
  storageRef
    .put(file)
    .then(() => storageRef.getDownloadURL())
    .then((url) => {
      return db.collection("documents").add({
        userId,
        fileName: file.name,
        fileUrl: url,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    .then(() => {
      alert("Document uploaded successfully!");
      loadDocuments(userId);
    })
    .catch((err) => alert(err.message));
});

// Load Documents
function loadDocuments(userId) {
  db.collection("documents")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get()
    .then((snapshot) => {
      docList.innerHTML = "";
      snapshot.forEach((doc) => {
        const { fileName, fileUrl } = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<a href="${fileUrl}" target="_blank">${fileName}</a>`;
        docList.appendChild(li);
      });
    })
    .catch((err) => alert(err.message));
}
