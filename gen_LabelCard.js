// Function to fetch JSON data
function fetchJSON() {
  return fetch("qrCodeMibi.json") // Adjust the path if necessary
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching JSON:", error));
}

// Function to generate QR codes
function generateQRCodes(data) {
  const qrcodeContainer = document.getElementById("qrcode-container");
  const linksContainer = document.getElementById("links-container");
  const disziplinSet = new Set();

  data.forEach((row) => {
    const dataToEncode = `${row.Anforderungscode}`;

    // Check if the Disziplin div already exists
    let disziplinDiv = document.getElementById(`disziplin-${row.Disziplin}`);
    let labelContainer = document.getElementById(
      `labelContainer-${row.Disziplin}`
    );

    if (!disziplinDiv) {
      // Create a new div for the Disziplin
      disziplinDiv = document.createElement("div");
      disziplinDiv.id = `disziplin-${row.Disziplin}`;
      disziplinDiv.className = "disziplin";

      labelContainer = document.createElement("div");
      labelContainer.id = `labelContainer-${row.Disziplin}`;
      labelContainer.className = "labelContainer";

      // Add the Disziplin name as a header
      const disziplinHeader = document.createElement("h3");
      disziplinHeader.setAttribute("class", "display-6 text-bg-success p-3");
      disziplinHeader.textContent = row.Disziplin;
      disziplinHeader;

      // Add "Back to Top" link
      const backToTopLink = document.createElement("a");
      backToTopLink.href = "#top";
      backToTopLink.textContent = "Back to Top";
      backToTopLink.className = "back-to-top";
      disziplinDiv.appendChild(backToTopLink);

      disziplinDiv.appendChild(disziplinHeader);
      disziplinDiv.appendChild(labelContainer);
      // Append the Disziplin div to the qrcode-container

      qrcodeContainer.appendChild(disziplinDiv);

      // Add a link to the Disziplin div
      if (!disziplinSet.has(row.Disziplin)) {
        const link = document.createElement("a");
        link.href = `#disziplin-${row.Disziplin}`;
        link.textContent = row.Disziplin;
        link.style.marginRight = "10px"; // Optional: Add some space between links
        linksContainer.appendChild(link);
        disziplinSet.add(row.Disziplin);
      }
    }
    // Create QR-Code Card
    const qrCardDiv = document.createElement("div");
    qrCardDiv.className = "card";
    const qrCardBody = document.createElement("div");
    qrCardBody.className = "card-body";

    //Create Labels for QR-Code / qrCardBody
    const cardTitle = document.createElement("h5");
    cardTitle.textContent = row.Anforderungscode;

    const cardDesc = document.createElement("p");
    cardDesc.textContent = row.Bezeichnung;

    qrCardBody.appendChild(cardTitle);
    qrCardBody.appendChild(cardDesc);

    // Create a container for the QR code
    const qrDiv = document.createElement("div");
    qrDiv.className = "qr-code"; // Add the qr-code class

    // Create the QR code
    const qrCode = new QRCode(qrDiv, {
      text: dataToEncode,
      width: 128,
      height: 128,
    });

    // Append the QR code container to the Disziplin div
    qrCardDiv.appendChild(qrDiv);
    qrCardDiv.appendChild(qrCardBody);
    labelContainer.appendChild(qrCardDiv);
  });
}

// Fetch the JSON data and generate QR codes
fetchJSON().then((data) => {
  generateQRCodes(data);
});
