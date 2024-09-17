const express = require('express');
const Book_Routes = express.Router();
const asyncHandler = require('express-async-handler');


const {bookSchema, BookUpdateSchema} = require('../Validation/validationBooks.js');
const Book = require('../Models/Books.js');

/*
 * @desc Get all books 
 * @route /api/books
 * @access Public
 * @method GET
*/

Book_Routes.get('/', asyncHandler(
     async function (req, res) {
          const books = await Book.find().populate('author');
          res.status(200).json(books);
     }
));


/*
  * @desc Get a single book by id
  * @route /api/books/:id
  * @access Public
  * @method GET
  * after the URI need to add / i will use app.set(express.strict(), true) in app.js file to make sure that the URI is correct.)
*/
Book_Routes.get("/:id", asyncHandler(
     async function (req, res) {
          const BookId = await Book.findById(req.params.id).populate('author');
          if (BookId) {
               res.status(200).json(BookId);
          } else {
               res.status(404).json({ message: 'Book not found' });
          }
     }
));

/*
 * @desc Create a new book
 * @route /api/books
 * @access Public
 * @method POST
*/ 
Book_Routes.post('/', async function(req ,res) {
     try {
          const { error, value } = bookSchema.validate(req.body);
          if (error) {
               return res.status(400).json({ message: error.details[0].message });
          }
          const book = new Book(value);
          await book.save();
          res.status(201).json(book);
          res.end();
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
          res.end();
     }
});


/*
 * @desc Update a book by id
 * @route /api/books/:id
 * @access Public
 * @method PUT
*/
Book_Routes.put('/:id', asyncHandler(
     async function (req, res) {
          const { error } = BookUpdateSchema.validate(req.body);
          if (!error) {
               const toUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
               if (toUpdate) {
                    res.status(200).json({ message: 'Book updated successfully' });
               } else {
                    res.status(404).json({ message: 'Book not found' });
               };
               res.end();
          } else {
               res.status(400).json({ message: error.details[ 0 ].message });
          }
     }
));

/*
 * @desc Delete a book by id  
 * @route /api/books/:id
 * @access Public
 * @method DELETE
*/

Book_Routes.delete('/:id', asyncHandler(
     async function (req, res) {
          const toDelete = await Book.findByIdAndDelete(req.params.id);
          if (toDelete) {
               res.status(200).json({ message: 'Book deleted successfully' });
          } else {
               res.status(404).json({ message: 'Book not found' });
          }
     }
));

/*
 * @desc Export Book_Routes 
 * @access Public
*/
module.exports = Book_Routes;
