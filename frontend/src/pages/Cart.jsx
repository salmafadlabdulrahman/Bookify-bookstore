import { Button, Link } from "@mui/material";
import CartItem from "../components/CartItem";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const Cart = () => {
  const { cart } = useContext(DataContext);
  const navigate = useNavigate()

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-container">
        <h2>Shopping Cart</h2>

        <div className="cart-items-container">
          {cart?.map((item) => (
            <CartItem
              key={item._id}
              {...item.book}
              quantity={item.quantity}
              checkout={false}
            />
          ))}
        </div>
      </div>
      <div className="total-container">
        <h3>Subtotal Items ({cart.length})</h3>
        <p>
          $
          {cart?.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.book.price * currentValue.quantity,
            0
          )}
        </p>

        <Button
          variant="container"
          disabled={cart.length === 0 ? true : false}
          sx={{
            bgcolor: "black",
            color: "white",
            "&:disabled": {
              bgcolor: "grey.400",
              color: "white",
              opacity: 0.8,
            },
          }}
          onClick={() => {
            if (cart.length === 0) {
              alert("Your cart is empty!");
              return;
            }
            navigate("/cart/payment");
          }}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
