import express from "express";
import fs from "fs";
import qr from "qr-image";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));
app.use("/qr", express.static(path.join(process.cwd(), "QR")));

if (!fs.existsSync("QR")) fs.mkdirSync("QR");

const csvFile = path.join("public", "urls.csv");

if (!fs.existsSync(csvFile)) fs.writeFileSync(csvFile, "URL,QR_Image\n");

app.post("/generate", (req, res) => {
  const { url, name } = req.body;
  if (!url || !name) return res.status(400).json({ error: "URL and name required" });

  const qrFilename = `QR/${name}.png`;

  if (fs.existsSync(qrFilename)) {
    return res.status(400).json({ error: "File with this name already exists" });
  }

  const qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream(qrFilename)).on("finish", () => {

    const row = `"${name}",${url},"${qrFilename}"\n`;
    fs.appendFileSync(csvFile, row);

    res.json({ qrPath: qrFilename });
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
