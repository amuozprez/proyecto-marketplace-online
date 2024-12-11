import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const Card = ({ product }) => {
  const {
    user,
    favorites,
    addToFavorites,
    removeFromFavorites,
    addToCart,
    cart,
  } = useContext(GlobalContext);

  // Verificar si el producto ya está en favoritos
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  // Verificar si el producto ya está en el carrito
  const isInCart = cart.some((item) => item.id === product.id);

  const handleFavoriteClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para añadir productos a favoritos.");
      return;
    }

    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const handleCartClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }

    if (!isInCart) {
      addToCart(product);
    } else {
      alert("Este producto ya está en el carrito.");
    }
  };

  return (
    <div className="card product-card shadow-sm">
      <img
        src={`http://localhost:3000${product.image_url}`}
        className="card-img-top"
        alt={product.descripcion}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{product.descripcion}</h5>
        <p className="card-text">
          Precio: <strong>${product.precio.toLocaleString()}</strong>
        </p>
        <p className="card-text">
          <small>Ubicación: {product.ubicacion}</small>
        </p>
        <div className="card-buttons d-flex justify-content-between mt-3">
          {/* Botón Ver Detalle */}
          <Link to={`/producto/${product.id}`} className="btn btn-info">
            <FaSearch className="me-2" /> Ver Detalle
          </Link>

          {/* Botón Agregar al Carrito */}
          <button
            className={`btn ${isInCart ? "btn-secondary" : "btn-success"}`}
            onClick={handleCartClick}
          >
            <FaShoppingCart className="me-2" /> {isInCart ? "En Carrito" : "Agregar"}
          </button>

          {/* Botón Favoritos */}
          <button
            className={`btn ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
            onClick={handleFavoriteClick}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
