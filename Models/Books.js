const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type:  mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
