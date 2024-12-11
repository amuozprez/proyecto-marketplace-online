const pool = require("../db/db");

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// Obtener productos de un usuario
const getUserProducts = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE user_id = $1", [userId]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los productos del usuario" });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { title, description, price, category, image_url } = req.body;
  const userId = req.user.id; // ID del usuario autenticado
  try {
    const result = await pool.query(
      `INSERT INTO products (user_id, title, description, price, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, title, description, price, category, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

module.exports = { getAllProducts, getUserProducts, createProduct };
