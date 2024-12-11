import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams(); // Captura el parámetro :id desde la URL
  const [product, setProduct] = useState(null); // Estado para almacenar los datos del producto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Producto no encontrado o no disponible.");
        }
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Producto no encontrado o no disponible.</p>; // Mensaje si el producto no existe
  }

  return (
    <div className="producto-detalle container my-5">
      <div className="row">
        {/* Imagen del producto */}
        <div className="col-12 col-md-6">
          <img
            src={
              product.image_url
                ? `http://localhost:3000${product.image_url}`
                : "/assets/images/default.jpg" // Imagen predeterminada si no hay una URL
            }
            alt={product.descripcion}
            className="img-fluid"
            style={{ objectFit: "cover", maxHeight: "400px" }}
          />
        </div>

        {/* Detalles del producto */}
        <div className="col-12 col-md-6">
          <h2>{product.descripcion}</h2>
          <ul className="list-unstyled">
            <li>
              <strong>Publicado por:</strong> {product.user_name}
            </li>
            <li>
              <strong>Ubicación:</strong> {product.ubicacion}
            </li>
            <li>
              <strong>Precio:</strong> ${product.precio.toLocaleString()}
            </li>
            <li>
              <strong>Categoría:</strong> {product.categoria}
            </li>
            <li>
              <strong>Estado:</strong> {product.estado}
            </li>
          </ul>
          <p>{product.descripcion}</p>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate(-1)} // Botón para regresar
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;
