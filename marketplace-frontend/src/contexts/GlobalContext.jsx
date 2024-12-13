import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const API_BASE_URL = "https://proyecto-marketplace-online.onrender.com/";

  // Iniciar sesión
  const login = async (token) => {
    localStorage.setItem("token", token);
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      logout();
    }
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    clearCart(); // Vaciar el carrito al cerrar sesión
  };

  // Mantener sesión activa
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) login(token);
  }, []);

  // Obtener productos
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error al obtener productos.");
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Obtener favoritos
  const fetchFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      } else {
        console.error("Error al obtener favoritos.");
      }
    } catch (error) {
      console.error("Error al obtener favoritos:", error);
    }
  };

  // Añadir a favoritos
  const addToFavorites = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para agregar productos a favoritos.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const newFavorite = await response.json();
        setFavorites((prev) => [...prev, newFavorite]);
      } else {
        console.error("Error al añadir a favoritos.");
      }
    } catch (error) {
      console.error("Error al añadir a favoritos:", error);
    }
  };

  // Eliminar de favoritos
  const removeFromFavorites = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
      } else {
        console.error("Error al quitar de favoritos.");
      }
    } catch (error) {
      console.error("Error al quitar de favoritos:", error);
    }
  };

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Incrementar cantidad
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrementar cantidad
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Vaciar el carrito
  const clearCart = () => setCart([]);

  useEffect(() => {
    fetchProducts();
    fetchFavorites();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        products,
        favorites,
        cart,
        login,
        logout,
        addToFavorites,
        removeFromFavorites,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
