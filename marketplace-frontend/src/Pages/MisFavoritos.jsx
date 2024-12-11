import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { FaTrashAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar"; // Importar Sidebar

const MisFavoritos = () => {
  const { user, favorites, removeFromFavorites } = useContext(GlobalContext);

  if (!user) {
    return <p className="text-center">Debes iniciar sesión para ver tus favoritos.</p>;
  }

  return (
    <div className="mis-favoritos container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-12 col-md-9">
          <h2 className="text-center">Mis Favoritos</h2>
          {favorites.length === 0 ? (
            <p className="text-center">No tienes productos en favoritos.</p>
          ) : (
            <div className="row">
              {favorites.map((product) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                  <div className="card shadow-sm">
                    <img
                      src={`http://localhost:3000${product.image_url}`}
                      className="card-img-top"
                      alt={product.descripcion}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.descripcion}</h5>
                      <p className="card-text">Precio: ${product.precio.toLocaleString()}</p>
                      <p className="card-text">Ubicación: {product.ubicacion}</p>
                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => removeFromFavorites(product.id)}
                      >
                        <FaTrashAlt /> Quitar de Favoritos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisFavoritos;
