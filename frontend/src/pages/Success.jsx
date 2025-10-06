import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/DataContext";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { cart, clearCart, user } = useContext(DataContext);

  useEffect(() => {
    const saveOrder = async () => {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      if (savedCart.length === 0) {
        return;
      }
      try {
        const shippingAddress = JSON.parse(
          localStorage.getItem("shippingAddress")
        );
        const paymentMethod = localStorage.getItem("paymentMethod");

        await axios.post(
          "http://localhost:5000/api/orders",
          {
            items: savedCart.map((item) => ({
              book: item.book._id,
              title: item.book.title,
              price: item.book.price,
              quantity: item.quantity,
            })),
            shippingAddress,
            paymentMethod,
            shippingPrice: 10,
            totalPrice:
              savedCart.reduce(
                (acc, cur) => acc + cur.book.price * cur.quantity,
                0
              ) +
              10 +
              2.75,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        localStorage.removeItem("cartItems");
        clearCart();
      } catch (err) {
        console.log("Error saving order:", err);
      }
    };

    if (sessionId) {
      saveOrder();
    }
  }, [sessionId, cart, clearCart, navigate, user]);

  return (
    <div
      style={{ textAlign: "center", marginTop: "4em", paddingBottom: "12em" }}
    >
      <h2 style={{ marginTop: "3em" }}>Payment Successful 🎉</h2>
    </div>
  );
};

export default Success;
