import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import UsersDashboard from "../components/UsersDashboard";
import BooksDashboard from "../components/BooksDashboard";
import AddBookForm from "../forms/AddBookForm";
import EditProductForm from "../forms/EditProductForm";
import EditUserForm from "../forms/EditUserForm";
import { DataContext } from "../context/DataContext";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("books");
  const [addBookForm, setAddBookForm] = useState(false);
  const [editBookForm, setEditBookForm] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { books, setBooks, users } = useContext(DataContext); 


  const handleBookUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  return (
    <Box component={"section"} display={"flex"}>
      <Box
        component={"aside"}
        bgcolor={"#e9ecef"}
        width={"20%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        padding={"2em"}
        height={"100vh"}
      >
        <Button
          onClick={() => {
            setAddBookForm(false);
            setEditBookForm(false);
            setActiveSection("books");
          }}
          color="black"
        >
          <MenuBookIcon />
          <Typography variant="p" marginLeft={".5em"}>
            Books
          </Typography>
        </Button>
        <Button
          onClick={() => setActiveSection("users")}
          color="black"
          sx={{ marginTop: "1em" }}
        >
          <GroupIcon />
          <Typography variant="p" marginLeft={".5em"}>
            Users
          </Typography>
        </Button>
      </Box>

      <Box component={"section"} width={"100%"}>
        {activeSection === "books" &&
          (addBookForm ? (
            <AddBookForm
              onClose={() => setAddBookForm(false)}
              onSuccess={(newBook) => {
                setBooks((prevBooks) => [newBook, ...prevBooks]);
                setAddBookForm(false);
              }}
            />
          ) : editBookForm ? (
            <EditProductForm
              book={selectedBook}
              onClose={() => setEditBookForm(false)}
              onSuccess={(updatedBook) => {
                handleBookUpdate(updatedBook);
                setEditBookForm(false);
              }}
            />
          ) : (
            <BooksDashboard
              books={books}
              setAddBookForm={setAddBookForm}
              setEditBookForm={setEditBookForm}
              setBooks={setBooks}
              setSelectedBook={setSelectedBook}
            />
          ))}
        {activeSection === "users" &&
          (editUser ? (
            <EditUserForm />
          ) : (
            <UsersDashboard setEditUser={setEditUser} users={users} />
          ))}
      </Box>
    </Box>
  );
};

export default Dashboard;