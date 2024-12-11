import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import Cart from "./components/Cart";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

  return (
    <Router>
      <div className="app container-fluid p-0">
        {/* Header con funciones para carrito y búsqueda */}
        <Header
          setSelectedCategory={setSelectedCategory}
          setSearchTerm={setSearchTerm} // Pasar el setter de búsqueda
          onCartClick={() => setIsCartOpen(true)}
        />

        {/* Contenido Principal */}
        <main className="content">
          <AppRoutes
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm} // Prop para el término de búsqueda
          />
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
};

export default App;
