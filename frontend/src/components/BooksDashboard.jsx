import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const BooksDashboard = ({
  setAddBookForm,
  setEditBookForm,
  setSelectedBook,
  books,
  setBooks,
}) => {
  const { user } = useContext(DataContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <Box component={"section"} padding={"1em"}>
      <Box
        component={"section"}
        marginBottom={"1em"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Products
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: "black" }}
          onClick={() => setAddBookForm(true)}
        >
          + Add Book
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1250 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell width={"200"} sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell width={"250"} sx={{ fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Edit
              </TableCell>
              <TableCell width={"100"} sx={{ fontWeight: "bold" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book._id}
                </TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>
                  <CreateIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditBookForm(true);
                      setSelectedBook(book);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDelete(book._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div></div>
    </Box>
  );
};

export default BooksDashboard;
