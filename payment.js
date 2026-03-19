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


function generateReceipt() {
  const name = document.getElementById("rName").value;
  const id = document.getElementById("rId").value;

  if (!name || !id) {
    alert("Complete your details first.");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 700;
  canvas.height = 500;

  // BACKGROUND
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // OUTER GOLD BORDER
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 660, 460);

  // INNER THIN BORDER
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, 640, 440);

  // TITLE
  ctx.fillStyle = "#111";
  ctx.font = "bold 40px Cinzel";
  ctx.textAlign = "center";
  ctx.fillText("Kritto", 350, 90);

  // SUBTITLE
  ctx.font = "16px Lora";
  ctx.fillStyle = "#777";
  ctx.fillText("Official Creation Receipt", 350, 120);

  // DIVIDER
  ctx.beginPath();
  ctx.moveTo(120, 150);
  ctx.lineTo(580, 150);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1;
  ctx.stroke();

  // DETAILS
  ctx.textAlign = "left";
  ctx.fillStyle = "#111";
  ctx.font = "18px Lora";

  const date = new Date().toLocaleDateString();

  ctx.fillText("Name:", 120, 200);
  ctx.fillText(name, 280, 200);

  ctx.fillText("Kritto Signature:", 120, 240);
  ctx.fillText(id, 280, 240);

  ctx.fillText("Status:", 120, 280);
  ctx.fillText("Paid", 280, 280);

  ctx.fillText("Date:", 120, 320);
  ctx.fillText(date, 280, 320);

  // FOOTER LINE
  ctx.beginPath();
  ctx.moveTo(120, 360);
  ctx.lineTo(580, 360);
  ctx.strokeStyle = "#d4af37";
  ctx.stroke();

  // FINAL TEXT
  ctx.textAlign = "center";
  ctx.font = "italic 18px Lora";
  ctx.fillStyle = "#333";
  ctx.fillText("Your creation is now sealed.", 350, 410);

  // EXPORT
  const imgURL = canvas.toDataURL("image/png");

  document.getElementById("receiptBox").innerHTML = `
    <img src="${imgURL}" style="max-width:100%; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.1);"/>
    <br><br>
    <a href="${imgURL}" download="kritto-receipt.png">
      <button>Download Receipt</button>
    </a>
  `;
}
