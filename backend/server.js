import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// Щоб працювали __dirname у ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Статичні файли frontend
const frontendPath = path.join(__dirname, "../frontend");
console.log("Frontend path:", frontendPath); // для перевірки шляху
app.use(express.static(frontendPath));

// Всі GET запити віддають index.html (для SPA)
app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


