import { Box, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const BookCard = ({ title, bookCover, price, author, _id, book }) => {
  const { addToCart } = useContext(DataContext);
  return (
    <>
      <Box component={"div"} position={"relative"} width={"230px"}>
        <Link
          component={RouterLink}
          to={`/shop/${_id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Box
            component="div"
            bgcolor="#343a40"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={bookCover}
              alt="book cover"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                width: "100%",
                padding: "1.2em",
                height: 320,
              }}
            />
          </Box>
        </Link>
        <Box component={"div"} marginTop={"1em"}>
          <Typography
            variant="body1"
            fontSize={"1em"}
            color=""
            fontWeight={"600"}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography
            component={"p"}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {author}
          </Typography>

          <Box
            component={"div"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="p"
              fontSize={"1em"}
              marginTop={".5em"}
              color=""
              fontWeight={"600"}
            >
              ${price}
            </Typography>
            <ShoppingCartIcon
              sx={{ cursor: "pointer", marginTop: ".7em" }}
              onClick={() => addToCart(book)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BookCard;
