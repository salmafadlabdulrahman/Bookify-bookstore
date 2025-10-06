import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import axios from "axios";

const genres = [
  "General",
  "Non-Fiction",
  "Science",
  "Romance",
  "Fantasy",
  "History",
  "Litreature"
];

const EditProductForm = ({ book, onClose, onSuccess }) => {
  const { user } = useContext(DataContext);
  const [form, setForm] = useState(book || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (book) setForm(book);
  }, [book]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      alert("You must be logged in to edit a book");
      return;
    }
    
    try {
      setLoading(true);
      const url = `http://localhost:5000/api/books/${book._id}`;

      const res = await axios.put(url, form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const newBook = res.data;
      if (onSuccess) onSuccess(newBook);
      if (onClose) onClose();
    } catch (err) {
      console.log(err)
      console.log(err.message);
      console.log("Failed to update a new book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component={"section"} textAlign={"center"} marginTop={"2em"}>
      <Typography variant="body2" fontWeight={"bold"} fontSize={"1.5em"}>
        Edit Book
      </Typography>

      <form
        style={{ width: "60%", margin: "0 auto", marginTop: "1.2em" }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title || ""}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Author"
            name="author"
            value={form.author || ""}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Price"
            name="price"
            value={form.price || ""}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Book Cover"
            name="bookCover"
            value={form.bookCover || ""}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Published Year"
            name="publishedYear"
            value={form.publishedYear || ""}
            onChange={handleChange}
            type="number"
          />

          <TextField
            label="select category"
            name="genre"
            value={form.genre || ""}
            onChange={handleChange}
            select
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Description"
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            required
          ></TextField>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#c8b6ff",
              padding: ".5em",
              color: "black",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Book"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditProductForm;
