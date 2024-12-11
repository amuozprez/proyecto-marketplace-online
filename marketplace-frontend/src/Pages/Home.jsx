import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Card from "../components/Card";

const Home = ({ searchTerm }) => {
  const { products } = useContext(GlobalContext); // Productos desde el contexto global
  const [selectedCategory, setSelectedCategory] = useState("Todos"); // Categoría seleccionada
  const [currentPage, setCurrentPage] = useState(1); // Página actual para la paginación
  const itemsPerPage = 8; // Número de productos por página

  // Filtrar productos por categoría y término de búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" ? true : product.categoria === selectedCategory;
    const matchesSearch = searchTerm
      ? product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  // Paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="home">
      {/* Sección de publicidad */}
      <section className="advertisement">
        <img
          src="/assets/images/blackfriday.jpg"
          alt="Black Friday"
          className="img-fluid banner"
        />
      </section>

      {/* Dropdown de categorías */}
      <div className="category-dropdown text-center my-4">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reinicia a la primera página al cambiar categoría
          }}
          style={{ maxWidth: "300px", margin: "0 auto" }}
        >
          <option value="Todos">Todas las categorías</option>
          <option value="Ropa">Ropa</option>
          <option value="Calzado">Calzado</option>
          <option value="Joyería">Joyería</option>
          <option value="Artesanía">Artesanía</option>
          <option value="Mascotas">Mascotas</option>
          <option value="Deportes">Deportes</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      {/* Título de categoría */}
      <h2 className="category-title text-center my-4">
        {searchTerm
          ? `Resultados para: "${searchTerm}"`
          : selectedCategory === "Todos"
          ? "Mostrando todos los productos"
          : `Categoría: ${selectedCategory}`}
      </h2>

      {/* Renderizado de productos */}
      <div className="row">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={product.id}
            >
              <Card product={product} />
            </div>
          ))
        ) : (
          <p className="text-center">
            No se encontraron productos para la búsqueda o categoría seleccionada.
          </p>
        )}
      </div>

      {/* Paginación */}
      <div className="pagination d-flex justify-content-center my-4">
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          {"<"}
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1
                ? "btn-primary"
                : "btn-outline-secondary"
            } mx-1`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Home;
