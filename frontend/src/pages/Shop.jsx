import { Box, MenuItem, TextField, Typography } from "@mui/material";
import BookCard from "../components/BookCard";
import { useContext, useMemo, useState } from "react";
import { DataContext } from "../context/DataContext";

const Shop = () => {
  const { books } = useContext(DataContext);
  const [searchedBook, setSearchedBook] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  console.log(books);

  const curBook = books.filter((book) =>
    book.title.toLocaleLowerCase().startsWith(searchedBook.toLocaleLowerCase())
  );

  const sortedBooks = useMemo(() => {
    if (!books) return [];

    const sorted = [...books];
    if (sortOrder === "asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [books, sortOrder]);

  return (
    <Box component={"section"} paddingBottom={"25em"}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component={"section"} padding={"2em"}>
          <TextField
            id="standard-basic"
            label="Search for a book"
            variant="standard"
            color="black"
            value={searchedBook}
            onChange={(e) => setSearchedBook(e.target.value)}
          />
        </Box>

        <TextField
          label="Sort Books"
          name=""
          select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ width: "200px", marginRight: "2em" }}
        >
          <MenuItem value="desc">Prices: From highest to lowest</MenuItem>
          <MenuItem value="asc">Prices: From lowest to highest</MenuItem>
        </TextField>
      </div>

      {searchedBook === "" ? (
        <>
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight={"bold"}
            marginTop={"2em"}
          >
            All Books Are Available Here
          </Typography>
          <Box
            component={"section"}
            paddingTop={"6em"}
            width={"80%"}
            margin={"0 auto"}
            display={"flex"}
            gap={"3em"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          >
            {sortedBooks?.map((book) => (
              <BookCard key={book._id} {...book} book={book} />
            ))}
          </Box>
        </>
      ) : curBook.length === 0 ? (
        <Typography
          component={"p"}
          textAlign={"center"}
          fontSize={"1.6em"}
          fontWeight={"600"}
        >
          No Books Found
        </Typography>
      ) : (
        <Box
          component={"section"}
          paddingTop={"6em"}
          width={"80%"}
          margin={"0 auto"}
          display={"flex"}
          gap={"3em"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {curBook?.map((book) => (
            <BookCard key={book._id} {...book} book={book} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Shop;
