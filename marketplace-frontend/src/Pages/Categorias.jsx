import React from "react";
import Card from "../components/Card";

const Categorias = () => {
  const products = [
    { id: 1, name: "Zapatos Deportivos", price: 2000, image: "/assets/images/product1.jpg" },
    { id: 2, name: "Sandalias", price: 1500, image: "/assets/images/product2.jpg" },
  ];

  return (
    <div className="categorias container-fluid">
      <h2>Categorías</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4" key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;