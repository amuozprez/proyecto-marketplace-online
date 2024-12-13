const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../consultas");
const router = express.Router();
const pool = require("../db");

// Registro de usuario
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: "Usuario registrado exitosamente", user: newUser.rows[0] });
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
