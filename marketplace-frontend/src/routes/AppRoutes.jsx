import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Categorias from "../pages/Categorias";
import ProductoDetalle from "../pages/ProductoDetalle";
import Perfil from "../pages/Perfil";
import Contacto from "../pages/Contacto";
import Nosotros from "../pages/Nosotros";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CrearPublicacion from "../pages/CrearPublicacion";
import Favoritos from "../pages/MisFavoritos";
import Ajustes from "../pages/Ajustes"; // Importamos Ajustes
import MisAnuncios from "../pages/MisAnuncios"; // Importa tu componente "Mis Anuncios"
import Cart from "../components/Cart";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = ({ searchTerm }) => {
  return (
    <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ajustes"
        element={
          <ProtectedRoute>
            <Ajustes />
          </ProtectedRoute>
        }
      />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/publicar"
        element={
          <ProtectedRoute>
            <CrearPublicacion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favoritos"
        element={
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mis-anuncios"
        element={
          <ProtectedRoute>
            <MisAnuncios />
          </ProtectedRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
