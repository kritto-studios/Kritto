// ==========================
// Firebase Setup
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================
// FORM SUBMISSION
// ==========================
const form = document.querySelector(".card-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = form.querySelector('input[name="name"]').value;
  const idea = form.querySelector('textarea[name="idea"]').value;
  const imageUrl = form.querySelector('input[name="image"]').value;
  const delivery = form.querySelector('select[name="delivery"]').value;

  // Generate tracking ID
  const trackingId = "KR-" + Math.floor(100000 + Math.random() * 900000);

  try {
    // Save to Firestore
    await addDoc(collection(db, "cards"), {
      name,
      idea,
      imageUrl,
      delivery,
      status: "Received",
      trackingId: trackingId,
      createdAt: new Date()
    });

    // Reset form
    form.reset();

    // Show success alert
    alert("Your request has been received\nTracking ID: " + trackingId);

    // ==========================
    // AUTO-GENERATE RECEIPT
    // ==========================
    generateReceipt(name, trackingId);

  } catch (error) {
    alert("Error: " + error.message);
  }
});

// ==========================
// RECEIPT FUNCTION
// ==========================
function generateReceipt(userName, trackingId) {
  const receiptBox = document.getElementById("receiptBox");
  
  receiptBox.innerHTML = `
    <div class="receipt">
      <h2>Kritto Receipt </h2>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>Tracking ID:</strong> ${trackingId}</p>
      <p><strong>Status:</strong> Received</p>
      <p>Thank you for trusting Kritto! Your creation is now in process.</p>
      <div class="receipt-seal">KRITTO</div>
    </div>
  `;
}
