const express = require("express");
const router = express.Router();
const pool = require("../db");
const { authenticateToken } = require("../middlewares"); // Agregado aquí
const upload = require("../upload");

// Publicar un producto
router.post("/", authenticateToken, upload.single("image"), async (req, res) => {
  const { categoria, ubicacion, descripcion, precio, estado } = req.body;

  if (!categoria || !ubicacion || !descripcion || !precio || !estado) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const newProduct = await pool.query(
      "INSERT INTO products (user_id, categoria, ubicacion, descripcion, precio, estado, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [req.user.id, categoria, ubicacion, descripcion, precio, estado, imageUrl]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error("Error al guardar el producto:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener los productos del usuario autenticado
router.get("/my-products", authenticateToken, async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products WHERE user_id = $1",
      [req.user.id]
    );
    res.status(200).json(products.rows);
  } catch (err) {
    console.error("Error al obtener los productos del usuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener un producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await pool.query(
      `SELECT p.*, u.name as user_name
       FROM products p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1`,
      [id]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado o no disponible." });
    }

    res.status(200).json(product.rows[0]);
  } catch (err) {
    console.error("Error al obtener el producto:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await pool.query(
      `SELECT p.*, u.name as user_name
       FROM products p
       JOIN users u ON p.user_id = u.id`
    );
    res.status(200).json(products.rows);
  } catch (err) {
    console.error("Error al obtener los productos:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para eliminar un producto por ID
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Verifica que el producto pertenece al usuario autenticado
    const product = await pool.query(
      `SELECT * FROM products WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (product.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado o no autorizado para eliminar." });
    }

    // Elimina el producto
    await pool.query(`DELETE FROM products WHERE id = $1`, [id]);

    res.status(200).json({ message: "Producto eliminado con éxito." });
  } catch (err) {
    console.error("Error al eliminar el producto:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
