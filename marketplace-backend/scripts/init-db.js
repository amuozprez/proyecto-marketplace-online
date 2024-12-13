const pool = require("../db");

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          edad INT,
          comuna VARCHAR(255),
          acerca_de_mi TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          categoria VARCHAR(255) NOT NULL,
          ubicacion VARCHAR(255) NOT NULL,
          descripcion TEXT NOT NULL,
          precio DECIMAL(10, 2) NOT NULL,
          estado VARCHAR(50) NOT NULL,
          image_url VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS favorites (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          product_id INT REFERENCES products(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tablas creadas exitosamente");
    process.exit(0);
  } catch (err) {
    console.error("Error al crear tablas", err.message);
    process.exit(1);
  }
};

initDB();
