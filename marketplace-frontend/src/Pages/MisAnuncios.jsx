import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { FaTrashAlt } from "react-icons/fa";
import Sidebar from "../components/Sidebar"; // Importar Sidebar

const MisAnuncios = () => {
  const { user } = useContext(GlobalContext); // Datos del usuario autenticado
  const [myProducts, setMyProducts] = useState([]);

  // Obtener los productos del usuario
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/products/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMyProducts(data); // Guarda los productos en el estado
        } else {
          console.error("Error al obtener los productos del usuario.");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchMyProducts();
  }, []);

  // Eliminar un producto
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Elimina el producto del estado local
        setMyProducts((prev) => prev.filter((product) => product.id !== productId));
      } else {
        console.error("Error al eliminar el producto.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  if (!user) {
    return <p>Debes iniciar sesión para ver tus anuncios.</p>;
  }

  return (
    <div className="mis-anuncios container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-12 col-md-9">
          <h2 className="text-center">Mis Anuncios</h2>
          {myProducts.length === 0 ? (
            <p className="text-center">No tienes anuncios publicados.</p>
          ) : (
            <div className="row">
              {myProducts.map((product) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                  <div className="card shadow-sm">
                    <img
                      src={
                        product.image_url
                          ? `http://localhost:3000${product.image_url}`
                          : "/assets/images/default.jpg"
                      }
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
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrashAlt /> Eliminar
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

export default MisAnuncios;
