import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Header = ({ setSearchTerm }) => {
  const { user, logout, cart } = useContext(GlobalContext); // Agregar el carrito desde el contexto
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    if (setSearchTerm) {
      setSearchTerm(event.target.value); // Actualiza el término de búsqueda
    }
    navigate("/"); // Redirige a la página principal donde se mostrarán los resultados
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header container-fluid bg-dark text-white p-0">
      {/* Barra de anuncios */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span>📢 ¡Envíos a toda la RM!</span>
          <span>🛍️ ¡Gran variedad de productos!</span>
          <span>🎁 ¡Promociones especiales por tiempo limitado!</span>
          <span>✨ ¡Múltiples categorías esperándote!</span>
          <span>🚚 ¡Compra fácil y rápido con nosotros!</span>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="main-header bg-dark text-white">
        <div className="row align-items-center mx-0">
          {/* Logo */}
          <div className="col-12 col-md-4 text-center text-md-start py-3">
            <Link to="/" className="logo">
              <img src="/assets/images/logo.jpg" alt="Logo AlCri" />
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="col-12 col-md-4 text-center py-2">
            <div className="slogan">
              <span>
                Publica <span className="highlight">rápido</span>
              </span>
              <br />
              <span>
                y vende <span className="highlight">rápido</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="form-control mx-auto"
              style={{ maxWidth: "400px" }}
              onChange={handleSearchChange}
            />
          </div>

          {/* Botones dinámicos */}
          <div className="col-12 col-md-4 text-center text-md-end py-2">
            {user ? (
              <>
                {/* Nombre del usuario como botón */}
                <span
                  className="me-3"
                  onClick={() => navigate("/perfil")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "inherit",
                  }}
                >
                  {user.name}
                </span>
                <button onClick={handleLogout} className="btn btn-danger me-2">
                  Cerrar Sesión
                </button>
                <Link to="/publicar" className="btn btn-primary">
                  + Publicar Aviso
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Ingresar
                </Link>
                <Link to="/register" className="btn btn-outline-light me-2">
                  Registrarse
                </Link>
              </>
            )}
            {/* Botón del carrito */}
            <Link
              to="/cart"
              className="btn btn-outline-light me-2 position-relative"
            >
              <FaShoppingCart />
              {/* Mostrar la cantidad de productos solo si hay elementos en el carrito */}
              {Array.isArray(cart) && cart.length > 0 && (
                <span
                  className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.8rem" }}
                >
                  {/* Calcular la cantidad total de productos en el carrito */}
                  {cart.reduce(
                    (total, item) => total + (item.quantity || 0),
                    0
                  )}
                </span>
              )}
            </Link>
            {/* Botón de favoritos */}
            <Link to="/favoritos" className="btn btn-outline-light">
              <FaHeart />
            </Link>
          </div>
        </div>
      </div>

      {/* Barra de navegación */}
      <nav className="nav-bar bg-dark text-center">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/contacto" className="nav-link">
          Contacto
        </Link>
        <Link to="/nosotros" className="nav-link">
          Nosotros
        </Link>
      </nav>
    </header>
  );
};

export default Header;
