import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB2V7uSRF88EEa_7ca8M2L6bnmYMl6zLBE",
  authDomain: "kritto-7c55b.firebaseapp.com",
  projectId: "kritto-7c55b",
  storageBucket: "kritto-7c55b.firebasestorage.app",
  messagingSenderId: "1091669122505",
  appId: "1:1091669122505:web:c3b83baed9db2a5ce8dc18",
  measurementId: "G-CL3SMLSLVN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signUp = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Your Signature Has Been Crafted");
  } catch (error) {
    alert(error.message);
  }
};

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Your Signature Is Recognized");
  } catch (error) {
    alert(error.message);
  }
};
