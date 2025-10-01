
    async function createQR() {
      const url = document.getElementById("url").value.trim();
      const name = document.getElementById("name").value.trim();
      const div = document.getElementById("qrcode");
      div.innerHTML = "";

      if (!url || !name) {
        alert("Please enter both URL and name!");
        return;
      }

      try {
        const res = await fetch("/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, name })
        });
        const data = await res.json();

        if (data.error) {
          alert(data.error);
          return;
        }

        const img = document.createElement("img");
        img.src = data.qrPath;
        img.alt = "QR Code";
        img.width = 200;
        img.height = 200;

        div.appendChild(img);
        div.classList.remove("hidden");

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