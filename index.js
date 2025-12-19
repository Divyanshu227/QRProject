import express from "express";
import qr from "qr-image";
import path from "path";
import { error } from "console";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));

app.post("/generate", (req, res) => {
  const {url} =req.body;
  if(!url){
    return res.status(400).json({error: "URL required"});
  }
  res.type("png");
  const qr_png =qr.image(url,{type: "png"});
  qr_png.pipe(res);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));