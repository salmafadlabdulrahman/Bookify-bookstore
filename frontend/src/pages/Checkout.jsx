import { Button } from "@mui/material";
import CartItem from "../components/CartItem";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { user, cart, clearCart } = useContext(DataContext);

  const paymentMethod = localStorage.getItem("paymentMethod");

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  const totalPrice = cart?.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.book.price * currentValue.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    if (paymentMethod === "Cash") {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cart.map((item) => ({
            book: item.book._id,
            title: item.book.title,
            price: item.book.price,
            quantity: item.quantity,
          })),
          shippingAddress,
          paymentMethod,
          shippingPrice: 10,
          totalPrice: totalPrice + 10 + 2.75,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      clearCart();
      localStorage.removeItem("cartItems");
      alert("Order placed with Cash on Delivery!");
      window.location.href = "/"
    } else if (paymentMethod === "Paypal") {
      await stripePromise;
      const { data } = await axios.post(
        "http://localhost:5000/api/stripe/checkout",
        {
          items: cart.map((item) => ({
            title: item.book.title,
            price: item.book.price,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      window.location.href = data.url;
    }
  };

  return (
    <div className="checkout-container">
      <h2>Order:</h2>

      <div className="checkout-content">
        <div className="checkout-content-container">
          <div>
            <h3>Shipping</h3>
            <p style={{ marginTop: "1em" }}>Name: {user?.name} </p>
            <p>Email: {user?.email} </p>
            <p style={{ marginBottom: "2em" }}>
              Shipping: {shippingAddress?.address}. {shippingAddress?.city}.{" "}
              {shippingAddress?.country}
            </p>
            <hr />
          </div>

          <div style={{ marginBottom: "2em" }}>
            <h3>Payment Method:</h3>
            <p>{paymentMethod}</p>
            <hr />
          </div>

          <div>
            <h3>Order Items</h3>
            <div className="cart-items-container">
              {cart?.map((item) => (
                <CartItem
                  key={item._id}
                  {...item.book}
                  quantity={item.quantity}
                  checkout={true}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary:</h3>
          <p>
            <strong>Items:</strong> ${totalPrice}
          </p>
          <p>
            <strong>Shipping:</strong> $10
          </p>
          <p>
            <strong>Tax:</strong> $2.75
          </p>
          <p>
            <strong>Total:</strong> ${totalPrice + 2.75 + 10}
          </p>
          <Button
            variant="contained"
            sx={{ bgcolor: "black", color: "white", marginTop: "1em" }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;