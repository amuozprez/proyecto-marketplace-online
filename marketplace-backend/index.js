const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("./db");
const cors = require("cors");
const path = require("path");
const upload = require("./upload"); // Importar la configuración de Multer
const productRoutes = require("./routes/productRoutes");
const { authenticateToken } = require("./middlewares");

const app = express();

// Configuración
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);

// Hacer pública la carpeta 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Clave secreta para JWT
const SECRET_KEY = "tu_secreto_para_jwt";

// Ruta para registrar un nuevo usuario
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
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

// Rutas de autenticación
app.post("/api/users/login", async (req, res) => {
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

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Inicio de sesión exitoso", token, user: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
});

app.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email, edad, comuna, acerca_de_mi FROM users WHERE id = $1",
      [req.user.id]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el perfil del usuario" });
  }
});

// Ruta para obtener los datos del perfil del usuario
app.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query("SELECT id, name, email, edad, comuna, acerca_de_mi FROM users WHERE id = $1", [req.user.id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el perfil del usuario" });
  }
});

// Ruta para actualizar los datos del perfil del usuario
app.put("/api/users/me", authenticateToken, async (req, res) => {
  const { name, edad, comuna, acerca_de_mi } = req.body;
  try {
    const updatedUser = await pool.query(
      "UPDATE users SET name = $1, edad = $2, comuna = $3, acerca_de_mi = $4 WHERE id = $5 RETURNING id, name, email, edad, comuna, acerca_de_mi",
      [name, edad, comuna, acerca_de_mi, req.user.id]
    );
    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar el perfil del usuario" });
  }
});

app.delete("/api/users/:id", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    res.status(200).json({ message: "Usuario eliminado con éxito." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el usuario." });
  }
});

// Ruta para obtener todos los productos con opción de filtrar por categoría
app.get("/api/products", async (req, res) => {
  const { category } = req.query;

  try {
    let query = "SELECT * FROM products";
    const params = [];

    if (category) {
      query += " WHERE categoria = $1";
      params.push(category);
    }

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});


// Ruta para publicar productos con imagen
app.post("/api/products", authenticateToken, upload.single("image"), async (req, res) => {
  const { categoria, ubicacion, descripcion, precio, estado } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Debe proporcionar una imagen." });
  }

  try {
    const imageUrl = `/uploads/${req.file.filename}`; // Ruta de la imagen
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

// Ruta para subir imágenes
app.post("/api/upload", authenticateToken, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Debe proporcionar una imagen" });
    }

    res.status(200).json({
      message: "Archivo subido con éxito",
      filePath: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    console.error("Error al subir el archivo:", err);
    res.status(500).json({ error: "Error al subir el archivo" });
  }
});

// Rutas de favoritos
app.get("/api/favorites", authenticateToken, async (req, res) => {
  try {
    const favorites = await pool.query(
      "SELECT p.* FROM favorites f JOIN products p ON f.product_id = p.id WHERE f.user_id = $1",
      [req.user.id]
    );
    res.status(200).json(favorites.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener favoritos" });
  }
});

app.post("/api/favorites", authenticateToken, async (req, res) => {
  const { productId } = req.body;

  try {
    // Verificar si ya existe en favoritos
    const existingFavorite = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    if (existingFavorite.rows.length > 0) {
      return res.status(400).json({ error: "El producto ya está en favoritos." });
    }

    // Insertar en favoritos
    const newFavorite = await pool.query(
      "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [req.user.id, productId]
    );

    res.status(201).json(newFavorite.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar a favoritos" });
  }
});


app.delete("/api/favorites/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM favorites WHERE user_id = $1 AND product_id = $2", [
      req.user.id,
      id,
    ]);

    res.status(200).json({ message: "Producto eliminado de favoritos." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar de favoritos" });
  }
});

app.delete("/api/favorites/:productId", authenticateToken, async (req, res) => {
  const { productId } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado en favoritos." });
    }

    res.status(200).json({ message: "Producto eliminado de favoritos con éxito." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el producto de favoritos." });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
