const pool = require("./db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa:", res.rows[0]);
    pool.end();
  } catch (err) {
    console.error("Error conectándose a la base de datos:", err);
    pool.end();
  }
})();
