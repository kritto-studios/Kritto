import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyB2V7uSRF88EEa_7ca8M2L6bnmYMl6zLBE",
  authDomain: "kritto-7c55b.firebaseapp.com",
  projectId: "kritto-7c55b",
  storageBucket: "kritto-7c55b.firebasestorage.app",
  messagingSenderId: "1091669122505",
  appId: "1:1091669122505:web:c3b83baed9db2a5ce8dc18"
};

/* INITIALIZE */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* FORM */
const form = document.querySelector(".card-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[name="name"]').value;
  const idea = form.querySelector('textarea[name="idea"]').value;
  const imageUrl = form.querySelector('input[name="image"]').value;
  const delivery = form.querySelector('select[name="delivery"]').value;

  try {
    await addDoc(collection(db, "cards"), {
      name,
      idea,
      imageUrl,
      delivery,
      createdAt: new Date()
    });

    alert("Submitted successfully");
    form.reset();

  } catch (error) {
    alert("Error: " + error.message);
    console.error(error);
  }
});
