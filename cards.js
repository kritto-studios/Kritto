// card.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

/* ===== DOM ELEMENTS ===== */
const form = document.querySelector(".card-form");
const paymentBox = document.getElementById("paymentBox");
const receiptBox = document.getElementById("receiptBox");

/* ===== STEP 1: FORM SUBMISSION ===== */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[name="name"]').value;
  const idea = form.querySelector('textarea[name="idea"]').value;
  const delivery = form.querySelector('select[name="delivery"]').value;

  const trackingId = "KR-" + Math.floor(100000 + Math.random() * 900000);

  try {
    const docRef = await addDoc(collection(db, "cards"), {
      name,
      idea,
      delivery,
      status: "Received",
      trackingId,
      createdAt: new Date()
    });

    form.reset();
    alert(`Request received! Your Tracking ID: ${trackingId}`);

    // Proceed to payment step
    showPaymentStep(name, trackingId, docRef.id);

  } catch (error) {
    alert("Error submitting form: " + error.message);
  }
});

/* ===== STEP 2: PAYMENT ===== */
function showPaymentStep(name, trackingId, docId) {
  paymentBox.innerHTML = `
    <h3>Payment for Your Card</h3>
    <p>Tracking ID: <strong>${trackingId}</strong></p>
    <button id="bkashBtn">Pay with Bkash</button>
    <button id="nagadBtn">Pay with Nagad</button>
    <button id="paypalBtn">Pay with PayPal</button>
    <button id="stripeBtn">Pay with Stripe</button>
  `;

  // Event listeners for fake payment simulation
  document.getElementById("bkashBtn").addEventListener("click", () => processPayment(docId, name, "Bkash"));
  document.getElementById("nagadBtn").addEventListener("click", () => processPayment(docId, name, "Nagad"));
  document.getElementById("paypalBtn").addEventListener("click", () => processPayment(docId, name, "PayPal"));
  document.getElementById("stripeBtn").addEventListener("click", () => processPayment(docId, name, "Stripe"));
}

/* ===== STEP 2A: PAYMENT PROCESS ===== */
async function processPayment(docId, name, method) {
  // Here you would integrate real payment APIs
  alert(`Payment via ${method} successful!`);

  // Update status in Firestore
  const cardRef = doc(db, "cards", docId);
  await updateDoc(cardRef, { status: "Paid", paymentMethod: method, paidAt: new Date() });

  // Proceed to receipt step
  generateReceipt(name, docId, method);
}

/* ===== STEP 3: RECEIPT ===== */
function generateReceipt(name, docId, method) {
  receiptBox.innerHTML = `
    <div class="receipt">
      <h2>Kritto Receipt</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Tracking ID:</strong> ${docId}</p>
      <p><strong>Payment Method:</strong> ${method}</p>
      <p><strong>Status:</strong> Paid</p>
      <p>Thank you for trusting Kritto. Your card will be handcrafted just for you ✨</p>
    </div>
    <button id="downloadReceipt">Download Receipt</button>
  `;

  document.getElementById("downloadReceipt").addEventListener("click", () => {
    const receiptContent = receiptBox.querySelector(".receipt").outerHTML;
    const blob = new Blob([receiptContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Kritto_Receipt_${docId}.html`;
    link.click();
  });
}
