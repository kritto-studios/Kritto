import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const container = document.getElementById("data-container");

async function loadData() {
  const querySnapshot = await getDocs(collection(db, "cards"));

  container.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const id = docSnap.id;

    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${data.name}</h3>
      <p><b>Idea:</b> ${data.idea}</p>
      <p><b>Delivery:</b> ${data.delivery}</p>

      <p><b>Process:</b> 
        <span class="status ${data.status?.toLowerCase().replace(/ /g, "-")}">
          ${data.status || "Received"}
        </span>
      </p>

      <p><a href="${data.imageUrl}" target="_blank">View Image</a></p>

      <select data-id="${id}">
        <option value="Received">Received</option>
        <option value="Curating">Curating</option>
        <option value="In Composition">In Composition</option>
        <option value="Refining">Refining</option>
        <option value="Sealed">Sealed</option>
        <option value="Delivered">Delivered</option>
      </select>
    `;

    const select = div.querySelector("select");
    select.value = data.status || "Received";

    select.addEventListener("change", async (e) => {
      const newStatus = e.target.value;

      await updateDoc(doc(db, "cards", id), {
        status: newStatus
      });

      loadData(); // refresh UI
    });

    container.appendChild(div);
  });
}

loadData();
