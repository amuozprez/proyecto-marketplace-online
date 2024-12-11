const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../consultas");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashedPassword);
    res.status(201).json({ message: "Usuario registrado", id: newUser.id });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = router;
