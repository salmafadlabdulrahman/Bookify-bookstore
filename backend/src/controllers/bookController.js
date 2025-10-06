const Book = require("../models/bookModel");

const getBooks = async (req, res) => {
  const { search, genre, author, sortBy, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  if (genre) query.genre = genre;
  if (author) query.author = { $regex: author, $options: "i" };

  let mongoQuery = Book.find(query);

  if (sortBy) {
    const [field, order] = sortBy.split(":");
    mongoQuery = mongoQuery.sort({ [field]: order === "desc" ? -1 : 1 });
  } else {
    mongoQuery = mongoQuery.sort({ createdAt: -1 });
  }

  const skip = (Number(page) - 1) * Number(limit);
  mongoQuery = mongoQuery.skip(skip).limit(Number(limit));

  const books = await mongoQuery.populate("owner", "name email role");
  res.json(books);
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate(
    "owner",
    "name email role"
  );
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
};

const createBook = async (req, res) => {
  const {
    title,
    author,
    description,
    genre,
    price,
    publishedYear,
    bookCover,
    ownerId,
  } = req.body;

  const owner = req.user.role === "admin" && ownerId ? ownerId : req.user._id;
  const book = await Book.create({
    title,
    author,
    description,
    genre,
    price,
    publishedYear,
    bookCover,
    owner,
  });

  res.status(201).json(book);
};

const loadBook = async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  req.book = book;
  next();
};

const updateBook = async (req, res) => {
  const { title, author, description, genre, price, publishedYear, bookCover } =
    req.body;

  const book = req.book;
  book.title = title ?? book.title;
  book.author = author ?? book.author;
  book.description = description ?? book.description;
  book.genre = genre ?? book.genre;
  book.price = price ?? book.price;
  book.publishedYear = publishedYear ?? book.publishedYear;
  book.bookCover = bookCover ?? book.bookCover;

  const updated = await book.save();
  res.json(updated);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json({ message: "Book deleted" });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  loadBook,
  updateBook,
  deleteBook,
};
