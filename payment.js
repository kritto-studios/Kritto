const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const id = params.get("id");

if (name && id) {
  document.getElementById("rName").value = name;
  document.getElementById("rId").value = id;
}


/* LOCAL PAYMENT INFO */

function bkash() {
  alert("Send payment to: 01711967454 generate your Kritto Receipt below.");
}

function nagad() {
  alert("Send payment to: 01910997671\n\nThen generate your Kritto Receipt below.");
}

function rocket() {
  alert("Send payment to: 01XXXXXXXXX\n\nThen generate your Kritto Receipt below.");
}

/* RECEIPT SYSTEM */

function generateReceipt() {
  const name = document.getElementById("rName").value;
  const id = document.getElementById("rId").value;

  if (!name || !id) {
    alert("Please fill all fields");
    return;
  }

  const date = new Date().toLocaleDateString();

  const receipt = `
    <div style="
      border:1px solid #d4af37;
      padding:30px;
      max-width:400px;
      margin:auto;
      font-family:'Cinzel', serif;
      background:white;
      border-radius:10px;
    ">
      <h2 style="text-align:center;">Kritto</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Kritto Signature:</b> ${id}</p>
      <p><b>Status:</b> Paid</p>
      <p><b>Date:</b> ${date}</p>
      <hr>
      <p style="text-align:center;">Your creation is now sealed.</p>
    </div>
  `;

  document.getElementById("receiptBox").innerHTML = receipt;
}
