import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const BookDetails = () => {
  const { books, addToCart } = useContext(DataContext);
  const params = useParams();
  const curBook = books.find((book) => book._id === params.bookId);

  return (
    <Box
      component={"section"}
      marginTop={"6em"}
      display={"flex"}
      justifyContent={"center"}
      gap={"3em"}
      marginBottom={"15em"}
    >
      <img
        src={curBook?.bookCover}
        alt="book cover"
        width={250}
        height={"auto"}
        style={{ objectFit: "cover" }}
      />

      <Box component={"section"} width={"40%"}>
        <Typography
          variant="p"
          fontSize={"1.3em"}
          fontWeight={"bold"}
          display={"block"}
        >
          Title: {curBook?.title}
        </Typography>

        <Typography
          variant="p"
          marginTop={"1em"}
          fontSize={"1em"}
          fontWeight={"bold"}
          display={"block"}
        >
          Author: {curBook?.author}
        </Typography>

        <Typography
          variant="p"
          fontSize={"1em"}
          marginTop={"1em"}
          fontWeight={"bold"}
          display={"block"}
        >
          Category: {curBook?.genre}
        </Typography>

        <Typography
          variant="p"
          fontSize={"1.1em"}
          marginTop={"1em"}
          fontWeight={"600"}
          display={"block"}
        >
          price: ${curBook?.price}
        </Typography>
        <Typography
          variant="p"
          marginTop={"2em"}
          fontSize={"1.1em"}
          display={"block"}
        >
          <strong style={{ display: "block", marginBottom: ".5em" }}>
            Overview:
          </strong>
          {curBook?.description}
        </Typography>

        <Button
          variant="contained"
          sx={{ marginTop: "2em", bgcolor: "black" }}
          onClick={() => addToCart(curBook)}
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
};

export default BookDetails;
