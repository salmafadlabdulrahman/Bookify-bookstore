import { Box, Button, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BookCard from "./BookCard";
import { useEffect, useState } from "react";
import axios from "axios";

const BestSeller = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <Box component={"section"} marginTop={"6em"}>
      <Typography variant="h4" textAlign={"center"} fontWeight={"600"}>
        Best Seller Books
      </Typography>

      <Box
        component={"section"}
        paddingTop={"6em"}
        width={"80%"}
        margin={"0 auto"}
        display={"flex"}
        gap={"5em"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        {books.slice(0, 3).map((book) => (
          <BookCard key={book._id} {...book} book={book} />
        ))}
      </Box>

      <Box
        component={"section"}
        marginTop={"20em"}
        display={"flex"}
        justifyContent={"center"}
        gap={"3em"}
        alignItems={"center"}
        paddingBottom={"10em"}
      >
        <img src="findfavbooks.jpg" alt="a collection of books" width={500} />

        <Box component={"section"} width={"40%"}>
          <Typography variant="h3" fontWeight={"bold"}>
            Find Your Favorite{" "}
            <Typography variant="span" color="#023e8a">
              Book Here!
            </Typography>{" "}
          </Typography>
          <Typography variant="body2" fontSize={"1.1em"} marginTop={"2em"}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            mollitia fuga minus vitae. Quam illo est dolorum saepe aspernatur
            autem vel at quidem minus odio aliquid consequuntur tempore, itaque
            voluptatibus?
          </Typography>

          <Link component={RouterLink} to="/shop">
            <Button
              variant="contained"
              sx={{
                marginTop: "3em",
                backgroundColor: "#023e8a",
                fontWeight: "600",
              }}
            >
              Explore Now
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BestSeller;