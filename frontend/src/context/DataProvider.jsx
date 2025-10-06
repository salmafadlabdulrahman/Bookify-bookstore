import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import axios from "axios";

const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        console.log("Failed to fetch books", err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.log("Failed to fetch users", err);
      }
    };

    if (user?.token && (user.role === "admin" || user.role === "owner")) {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCart(data.items || []);
      } catch (error) {
        console.log(error.message, "failed to load cart");
      }
    };

    fetchCart();
  }, [user]);

  const signIn = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signUp = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("shippingAddress");
    window.location.href = "/signin";
    setUser(null);
  };

  

  const addToCart = async (book) => {
    if (!user) {
      console.error("You must be logged in to add items to cart");
      return;
    }
    try {
      const { data } = await axios.post(
        "/api/cart",
        { bookId: book._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart(data.items || []);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const removeFromCart = async (bookId) => {
    if (!user) {
      console.error("You must be logged in to add items to cart");
      return;
    }
    try {
      const { data } = await axios.delete(`api/cart/${bookId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCart(data.items || []);
    } catch (error) {
      console.log("failed to remove from cart", error);
    }
  };

  const clearCart = async () => {
    if (!user) {
      console.error("You must be logged in to add items to cart");
      return;
    }
    try {
      const { data } = await axios.delete("/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCart(data.items || []);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };


  const decrementQuantity = async (id) => {
    if (!user) {
      console.error("You must be logged in to add items to cart");
      return;
    }
    try {
      const { data } = await axios.post(
        "/api/cart",
        { bookId: id, quantity: -1 },

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart(data.items || []);
    } catch (error) {
      console.error("Failed to decrement quantity", error);
    }
  };

  const incrementQuantity = async (id) => {
    if (!user) {
      console.error("You must be logged in to add items to cart");
      return;
    }
    try {
      const { data } = await axios.post(
        "/api/cart",
        { bookId: id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart(data.items || []);
    } catch (error) {
      console.error("Failed to decrement quantity", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        setUser,
        user,
        signIn,
        signUp,
        logout,
        loading,
        books,
        setBooks,
        users,
        setUsers,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        decrementQuantity,
        incrementQuantity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
