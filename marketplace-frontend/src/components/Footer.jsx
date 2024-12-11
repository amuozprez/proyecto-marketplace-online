import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";

const Footer = () => {
  const { user } = useContext(GlobalContext); // Acceder al usuario autenticado
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      navigate("/perfil"); // Redirigir al perfil si la sesión está activa
    } else {
      navigate("/login"); // Redirigir al login si no hay sesión
    }
  };

  return (
    <footer className="container-fluid bg-dark text-white py-4">
      <div className="row">
        <div className="col-12 col-md-4 text-center">
          <h5>Nosotros</h5>
          <ul className="list-unstyled text-center">
            <li>
              <Link to="/politicas" className="text-white">
                Políticas de envío
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className="text-white">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-4 text-center">
          <h5>Mi Cuenta</h5>
          <ul className="list-unstyled text-center">
            <li>
              <button
                className="btn btn-link text-white p-0"
                onClick={handleProfileClick}
              >
                Resumen
              </button>
            </li>
            <li>
              <Link to="/favoritos" className="text-white">
                Favoritos
              </Link>
            </li>
            <li>
              <Link to="/publicar" className="text-white">
                Publicar
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-4 text-center">
          <h5>Redes Sociales</h5>
          <ul className="list-unstyled text-center">
            <li>
              <a href="https://instagram.com" className="text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com" className="text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" className="text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-3">
        <p>©2024, Santiago de Chile, MarketplaceHome</p>
      </div>
    </footer>
  );
};

export default Footer;
