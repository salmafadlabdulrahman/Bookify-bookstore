import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";

const genres = [
  "General",
  "Non-Fiction",
  "Science",
  "Romance",
  "Fantasy",
  "History",
  "Litreature",
];

const AddBookForm = ({ onClose, onSuccess }) => {
  const { user } = useContext(DataContext);
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    bookCover: "",
    genre: "",
    description: "",
    publishedYear: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user.token) {
      alert("You must be logged in to add a book");
      return;
    }

    const data = {
      title: form.title,
      author: form.author,
      price: Number(form.price),
      bookCover: form.bookCover,
      genre: form.genre,
      description: form.description,
      publishedYear: Number(form.publishedYear),
    };

    try {
      setLoading(true);
      const url = `http://localhost:5000/api/books`;
      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const newBook = res.data;
      if (onSuccess) onSuccess(newBook);
      if (onClose) onClose();
    } catch (err) {
      console.log(err.message);
      console.log("Failed to add a new book");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box component={"section"} textAlign={"center"} marginTop={"2em"}>
      <Typography variant="body2" fontWeight={"bold"} fontSize={"1.5em"}>
        Add New Book
      </Typography>

      <form
        style={{ width: "60%", margin: "0 auto", marginTop: "1.2em" }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Author"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Book Cover"
            name="bookCover"
            value={form.bookCover}
            onChange={handleChange}
            required
          ></TextField>

          <TextField
            label="Published Year"
            name="publishedYear"
            value={form.publishedYear}
            onChange={handleChange}
            type="number"
          />

          <TextField
            label="select category"
            name="genre"
            select
            value={form.genre}
            onChange={handleChange}
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
            value={form.description}
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
            {loading ? "Saving..." : "Submit"}
          </Button>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default AddBookForm;
