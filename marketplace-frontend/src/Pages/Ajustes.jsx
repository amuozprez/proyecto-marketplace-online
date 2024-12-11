import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Importar Sidebar reutilizable

const Ajustes = () => {
  const { user, logout } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        alert("Cuenta eliminada exitosamente.");
        logout(); // Cerrar sesión y limpiar estado
        navigate("/"); // Redirigir a la página principal
      } else {
        throw new Error("Error al intentar eliminar la cuenta.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al eliminar la cuenta. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="ajustes container-fluid">
      <div className="row">
        {/* Barra lateral */}
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-12 col-md-9">
          <div
            className="bg-light p-4 shadow-sm rounded"
            style={{ minHeight: "500px" }}
          >
            <h2 className="text-center">Ajustes</h2>
            <p className="text-center">
              Aquí puedes gestionar los ajustes de tu cuenta.
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                style={{ width: "200px" }}
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ajustes;
