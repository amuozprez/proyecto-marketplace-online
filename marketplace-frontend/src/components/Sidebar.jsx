import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar d-flex flex-column">
      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => navigate("/perfil")}
      >
        Perfil
      </button>
      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => navigate("/mis-anuncios")}
      >
        Mis Anuncios
      </button>
      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => navigate("/favoritos")}
      >
        Mis Favoritos
      </button>
      <button
        className="btn btn-outline-secondary mb-2"
        onClick={() => navigate("/ajustes")}
      >
        Ajustes
      </button>
      <button
        className="btn btn-outline-danger"
        onClick={() => {
          localStorage.removeItem("token"); // Limpia el token
          navigate("/login"); // Redirige al login
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Sidebar;
