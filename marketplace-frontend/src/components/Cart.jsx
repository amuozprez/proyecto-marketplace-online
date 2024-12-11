import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  // Calcular el total de la compra
  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <div className="cart container my-5">
      <h2 className="text-center">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Tu carrito está vacío.</p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Volver a la tienda
          </button>
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.descripcion}</td>
                  <td>${item.precio.toLocaleString()}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary me-2"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary ms-2"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.precio * item.quantity).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4>
              Total: $
              {cart
                .reduce((total, item) => total + item.precio * item.quantity, 0)
                .toLocaleString()}
            </h4>
            <button
              className="btn btn-success me-2"
              onClick={() => {
                alert("Compra finalizada. Gracias por tu compra.");
                clearCart();
              }}
            >
              Finalizar Compra
            </button>
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Volver a la tienda
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
