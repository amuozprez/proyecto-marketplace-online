import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Perfil = () => {
  const { logout, user, login } = useContext(GlobalContext); // Agregamos `login` para refrescar el usuario tras actualizar
  const [editMode, setEditMode] = useState(false); // Estado para habilitar/deshabilitar edición
  const [formData, setFormData] = useState({
    name: "",
    edad: "",
    comuna: "",
    acerca_de_mi: "",
  }); // Estado del formulario
  const [error, setError] = useState(null); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const navigate = useNavigate();

  // Sincronizar `formData` con el estado del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        edad: user.edad || "",
        comuna: user.comuna || "",
        acerca_de_mi: user.acerca_de_mi || "",
      });
      setLoading(false); // Se desactiva el estado de carga cuando los datos están disponibles
    }
  }, [user]); // Cada vez que cambie el estado `user`, actualiza el formulario.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil");
      }

      const updatedData = await response.json();
      setFormData(updatedData); // Actualizar el estado local
      setEditMode(false);
      alert("Perfil actualizado con éxito");

      // Actualizar el contexto global con los datos más recientes
      login(token);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el perfil.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <p className="text-center">Cargando perfil...</p>;
  }

  return (
    <div className="perfil container-fluid">
      <div className="row">
        {/* Barra lateral */}
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-12 col-md-9">
          <h2 className="text-center">Mi Perfil</h2>
          {error && <p className="text-danger">{error}</p>}
          <form>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Edad</label>
              <input
                type="number"
                name="edad"
                className="form-control"
                value={formData.edad}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <input
                type="text"
                name="comuna"
                className="form-control"
                value={formData.comuna}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Acerca de mí</label>
              <textarea
                name="acerca_de_mi"
                className="form-control"
                rows="4"
                value={formData.acerca_de_mi}
                onChange={handleChange}
                disabled={!editMode}
              ></textarea>
            </div>
            {editMode ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleUpdate}
              >
                Guardar Cambios
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setEditMode(true)}
              >
                Editar
              </button>
            )}
          </form>
          <hr />
          <button
            type="button"
            className="btn btn-danger mt-3"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
