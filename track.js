import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

window.track = async function () {
  const input = document.getElementById("trackInput").value.trim();
  const result = document.getElementById("result");

  result.innerHTML = "Searching...";

  let order = null;
  let payment = null;

  /* GET ORDERS */
  const ordersSnap = await getDocs(collection(db, "cards"));
  ordersSnap.forEach((doc) => {
    const data = doc.data();
    if (data.trackingId === input) {
      order = data;
    }
  });

  /* GET PAYMENTS */
  const paymentsSnap = await getDocs(collection(db, "payments"));
  paymentsSnap.forEach((doc) => {
    const data = doc.data();
    if (data.trackingId === input) {
      payment = data;
    }
  });

  /* DISPLAY */
  if (!order) {
    result.innerHTML = "Kritto Signature not found.";
    return;
  }

  result.innerHTML = `
    <p><b>Kritto Signature:</b> ${input}</p>
    <p><b>Process:</b> ${order.status}</p>

    <p><b>Verification Status:</b> ${
      payment ? payment.status : "Pending"
    }</p>

    ${
      payment
        ? `<p><a href="${payment.proof}" target="_blank">View Payment Proof</a></p>`
        : `<p>No payment submitted yet.</p>`
    }
  `;
};
