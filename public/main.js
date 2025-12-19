
    async function createQR() {
      const url = document.getElementById("url").value.trim();
      const name = document.getElementById("name").value.trim();
      const preview = document.getElementById("qrcode");
      preview.innerHTML = "";

      if (!url || !name) {
        alert("Please enter both URL and name!");
        return;
      }

      try {
        const res = await fetch("/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url })
        });
        if (!res.ok) {
          alert("Failed to generate QR");
          return;
        }
        const blob = await res.blob();

        const img = document.createElement("img");
        img.src = URL.createObjectURL(blob);
        img.alt = "QR Code";
        img.width = 200;
        img.height = 200;

        preview.appendChild(img);
        const d = document.createElement("a");
        d.href = img.src;
        d.download =`${name}.png`;
        document.body.appendChild(d);
        d.click();
        document.body.removeChild(d);
        setTimeout(() => URL.revokeObjectURL(img.src), 1000);

      } catch (err) {
        console.error(err);
        alert("Error generating QR code");
      }

    }
document.getElementById("url").addEventListener("keyup", function(event) {
  if (event.key === "Enter")
  document.getElementById("name").focus(); 
});

document.getElementById("name").addEventListener("keyup", function(event) {
  if (event.key === "Enter") createQR();
});