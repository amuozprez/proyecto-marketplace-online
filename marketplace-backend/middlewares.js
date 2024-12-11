const jwt = require("jsonwebtoken");
const SECRET_KEY = "tu_secreto_para_jwt"; // Asegúrate de que esta clave coincide en todos los archivos que usan JWT

// Middleware para autenticar el token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso no autorizado" });

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    console.error("Token inválido:", err);
    res.status(403).json({ error: "Token inválido" });
  }
};

module.exports = { authenticateToken };