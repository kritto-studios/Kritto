// card.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* ===== FIREBASE CONFIG ===== */
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
const auth = getAuth(app); // 

/* ===== DOM ===== */
const form = document.querySelector(".card-form");
const paymentBox = document.getElementById("paymentBox");
const receiptBox = document.getElementById("receiptBox");

/* ===== STEP 1: FORM ===== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[name="name"]').value;
  const idea = form.querySelector('textarea[name="idea"]').value;
  const delivery = form.querySelector('select[name="delivery"]').value;

  const trackingId = "KR-" + Math.floor(100000 + Math.random() * 900000);
  const user = auth.currentUser;

  try {
    // SAVE & GET docRef
    const docRef = await addDoc(collection(db, "cards"), {
      name,
      idea,
      delivery,
      status: "Received",
      trackingId,
      userId: user ? user.uid : "guest",
      createdAt: new Date()
    });

    form.reset();

    alert(`Request received ✨\nTracking ID: ${trackingId}`);

    // PASS docRef.id
    showPaymentStep(name, trackingId, docRef.id);

  } catch (error) {
    alert("Error: " + error.message);
  }
});

/* ===== STEP 2: PAYMENT ===== */
function showPaymentStep(name, trackingId, docId) {
  paymentBox.innerHTML = `
    <h3>Complete Your Payment</h3>
    <p>Tracking ID: <strong>${trackingId}</strong></p>

    <button id="bkashBtn">Bkash</button>
    <button id="nagadBtn">Nagad</button>
    <button id="paypalBtn">PayPal</button>
    <button id="stripeBtn">Card / Stripe</button>
  `;

  document.getElementById("bkashBtn").onclick = () => processPayment(docId, name, trackingId, "Bkash");
  document.getElementById("nagadBtn").onclick = () => processPayment(docId, name, trackingId, "Nagad");
  document.getElementById("paypalBtn").onclick = () => processPayment(docId, name, trackingId, "PayPal");
  document.getElementById("stripeBtn").onclick = () => processPayment(docId, name, trackingId, "Stripe");
}

/* ===== STEP 2A ===== */
async function processPayment(docId, name, trackingId, method) {
  alert(`Payment via ${method} successful ✨`);

  const cardRef = doc(db, "cards", docId);

  await updateDoc(cardRef, {
    status: "Paid",
    paymentMethod: method,
    paidAt: new Date()
  });

  generateReceipt(name, trackingId, method);
}

/* ===== STEP 3: RECEIPT ===== */
function generateReceipt(name, trackingId, method) {
  receiptBox.innerHTML = `
    <div class="receipt">
      <h2>Kritto Receipt</h2>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Tracking ID:</strong> ${trackingId}</p>
      <p><strong>Payment:</strong> ${method}</p>
      <p><strong>Status:</strong> Paid</p>

      <p class="thankyou">
        Your creation has entered the atelier ✨
      </p>
    </div>

    <button id="downloadReceipt">Download Receipt</button>
  `;

  document.getElementById("downloadReceipt").onclick = () => {
    const content = receiptBox.querySelector(".receipt").outerHTML;

    const blob = new Blob([content], { type: "text/html" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `Kritto_${trackingId}.html`;
    link.click();
  };
}
