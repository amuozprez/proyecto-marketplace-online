const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes"); // Rutas de productos
const userRoutes = require("./routes/userRoutes"); // Rutas de usuarios

dotenv.config(); // Cargar las variables de entorno desde .env

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON en las solicitudes

// Rutas API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Middleware para servir archivos estáticos (frontend)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

// Redirigir todas las demás rutas al frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API corriendo. Frontend no disponible en modo desarrollo.");
  });
}

// Puerto del servidor
const PORT = process.env.PORT || 4000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en ${
      process.env.NODE_ENV === "production"
        ? `https://proyecto-marketplace-online.onrender.com`
        : `http://localhost:${PORT}`
    }`
  );
});
