const mongoose = require("mongoose");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "General",
        "Non-Fiction",
        "Science",
        "Romance",
        "Fantasy",
        "History",
        "Litreature",
      ],
      default: "General",
      required: false,
    },
    price: { type: Number, required: true, min: 0 },
    publishedYear: { type: Number, required: false, default: currentYear },
    bookCover: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1689467902804-8d4053084626?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);