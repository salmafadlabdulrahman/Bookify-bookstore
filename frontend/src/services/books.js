import API from "./api";

export const getBooks = async () => {
  const { data } = await API.get("/books");
  return data;
};

export const createBook = async (bookData) => {
  const { data } = await API.post("/books", bookData);
  return data;
};

export const updateBook = async (id, bookData) => {
  const { data } = await API.put(`/books/${id}`, bookData);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await API.delete(`/books/${id}`);
  return data;
};
