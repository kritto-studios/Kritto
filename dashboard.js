import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* CONFIG */
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
const db = getFirestore(app);
const auth = getAuth();

const container = document.getElementById("cardsContainer");

/* LOAD USER DATA */
auth.onAuthStateChanged(async (user) => {

  if (!user) {
    container.innerHTML = "<p>Please log in to view your creations.</p>";
    return;
  }

  const q = query(
    collection(db, "cards"),
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    container.innerHTML = "<p>No creations yet.</p>";
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();

    container.innerHTML += `
      <div class="card-item">
        <h3>${data.name}</h3>
        <p><strong>Tracking:</strong> ${data.trackingId}</p>
        <p><strong>Status:</strong> ${data.status}</p>
      </div>
    `;
  });

});
