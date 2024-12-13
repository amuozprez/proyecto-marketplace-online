import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

// Centralizar la URL base de la API (opcional, pero recomendado)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://proyecto-marketplace-online.onrender.com/api";

const Login = () => {
  const { login } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    // Verificar los datos que se envían
    console.log("Datos enviados:", formData);
  
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        await login(token);
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Respuesta del backend:", errorData);
        setError(errorData.error || "Error al iniciar sesión.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Ocurrió un error. Por favor, intenta nuevamente.");
    }
  };


  return (
    <div className="login container">
      <h2>Iniciar Sesión</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
