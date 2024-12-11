import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const navigate = useNavigate(); // Inicializar el hook para navegación

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("Tu mensaje ha sido enviado con éxito");
    setFormData({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <div className="contacto container">
      <h2 className="text-center">Contacto</h2>
      <p className="text-center">
        Si tienes alguna consulta, no dudes en escribirnos. Completa el
        formulario a continuación y te responderemos a la brevedad.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            className="form-control"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
      {/* Botón de volver */}
      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate("/")} // Redirige siempre al Home
      >
        Volver
      </button>
    </div>
  );
};

export default Contacto;