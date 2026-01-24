import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5001;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = __dirname;

const ordersFile = path.join(__dirname, "orders.json");

app.use(express.json());
app.use(express.static(frontendPath));

/* ===== API ===== */


app.post("/api/orders", (req, res) => {
  const order = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.total,
    createdAt: new Date().toISOString(),
  };

  let orders = [];
  if (fs.existsSync(ordersFile)) {
    orders = JSON.parse(fs.readFileSync(ordersFile));
  }

  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

  res.json({ success: true, order });
});

// отримати всі замовлення (для перевірки)
app.get("/api/orders", (req, res) => {
  if (!fs.existsSync(ordersFile)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(ordersFile)));
});

/* ===== ROUTES ===== */

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/shop", (req, res) => {
  res.sendFile(path.join(frontendPath, "shop.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(frontendPath, "cart.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
