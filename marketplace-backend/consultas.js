const db = require("./db");

// Consultas relacionadas con los usuarios
const createUser = async (name, email, password) => {
  const result = await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
    [name, email, password]
  );
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

// Consultas relacionadas con los productos
const getAllProducts = async () => {
  const result = await db.query("SELECT * FROM products");
  return result.rows;
};

const createProduct = async (name, description, price, category) => {
  const result = await db.query(
    "INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING id",
    [name, description, price, category]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllProducts,
  createProduct,
};
