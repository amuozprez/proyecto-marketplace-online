const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // Rutas de productos
const userRoutes = require("./routes/userRoutes"); // Rutas de usuarios

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware para servir el frontend
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Redirige cualquier otra ruta al frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
