import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CrearPublicacion = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    categoria: "",
    ubicacion: "",
    descripcion: "",
    precio: "",
    estado: "nuevo",
    image: null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!user) {
      setError("Debes iniciar sesión para publicar un producto.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.image) {
      setError("Debes proporcionar una imagen para el producto.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Producto publicado con éxito.");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al publicar el producto.");
      }
    } catch (err) {
      console.error("Error al publicar el producto:", err);
      setError("Error interno del servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="crear-publicacion container-fluid">
      <h2 className="text-center my-4">Publicar Producto</h2>
      <div className="row">
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>
        <div className="col-12 col-md-9">
          {error && <p className="alert alert-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Imagen</label>
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Categoría</label>
              <input
                type="text"
                name="categoria"
                className="form-control"
                value={formData.categoria}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                className="form-control"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Precio</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                value={formData.precio}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="mb-3">
              <label>Estado</label>
              <select
                name="estado"
                className="form-control"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publicando..." : "Publicar"}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default CrearPublicacion;
