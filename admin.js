import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* SAME CONFIG */
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "kritto-7c55b",
  storageBucket: "kritto-7c55b.firebasestorage.app",
  messagingSenderId: "1091669122505",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const container = document.getElementById("data-container");

async function loadData() {
  const querySnapshot = await getDocs(collection(db, "cards"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${data.name}</h3>
      <p><span class="gold">Idea:</span> ${data.idea}</p>
      <p><span class="gold">Delivery:</span> ${data.delivery}</p>
      <p><span class="gold">Image:</span> 
        <a href="${data.imageUrl}" target="_blank">View</a>
      </p>
    `;

    container.appendChild(div);
  });
}

loadData();
