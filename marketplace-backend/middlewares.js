const jwt = require("jsonwebtoken");
const SECRET_KEY = "tu_secreto_para_jwt"; // Asegúrate de que esta clave coincide en todos los archivos que usan JWT

// Middleware para autenticar el token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };