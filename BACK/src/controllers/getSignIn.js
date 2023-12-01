const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_CLIENTE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
app.use(bodyParser.json());

// Ruta para la autenticación del usuario
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    // Comparar las contraseñas hasheadas
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para el registro de nuevos usuarios
app.post("/api/signup", async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query(
      "INSERT INTO usuarios (name, last_name, email, password) VALUES ($1, $2, $3, $4)",
      [name, lastName, email, hashedPassword]
    );

    return res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend iniciado en http://localhost:${port}`);
});
