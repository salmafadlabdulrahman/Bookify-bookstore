import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const CartItem = ({
  _id: bookId,
  title,
  bookCover,
  price,
  quantity,
  checkout,
}) => {
  const { removeFromCart, decrementQuantity, incrementQuantity } =
    useContext(DataContext);

  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={bookCover} alt="book cover" width={150} />
        <p className="book-title">{title}</p>
        <p>${price}</p>
        {!checkout ? (
          <>
            <p>
              <RemoveIcon
                sx={{ cursor: "pointer" }}
                onClick={() => decrementQuantity(bookId)}
              />{" "}
              {quantity}{" "}
              <AddIcon
                sx={{ cursor: "pointer" }}
                onClick={() => incrementQuantity(bookId)}
              />
            </p>
            <DeleteIcon
              sx={{ marginBottom: ".5em", cursor: "pointer" }}
              onClick={() => removeFromCart(bookId)}
            />
          </>
        ) : (
          <>
          <p>${price} x {quantity} = ${price * quantity}</p>
          </>
        )}
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
