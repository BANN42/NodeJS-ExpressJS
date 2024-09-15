const express = require('express');
const fs = require('node:fs');
const {bookSchema, BookUpdateSchema} = require('../Validation/validationRules.js');
const Book_Routes = express.Router();

const {readJsonContent} = require('../features/readFromJsonFile.js')


/*
 * @desc Read books.json file synchronously
 * @access public
 * @method ReadFileSyn
 * @param {string} filePath - path of the file to be read
 * @returns {string} - content of the file
*/

const BooksList = JSON.parse(readJsonContent("./api/books.json"));



/*
 * @desc Get all books 
 * @route /api/books
 * @access Public
 * @method GET
*/

Book_Routes.get('/', function(req, res){
     res.json(BooksList).status(200);
     res.end();
});


/*
  * @desc Get a single book by id
  * @route /api/books/:id
  * @access Public
  * @method GET
*/
Book_Routes.get('/:id', function(req, res){
     const bookId = +req.params.id;
     const book = BooksList.find(book => book.id === bookId);
     if(book){
          res.json(book).status(200);
     }else{
          res.status(404).json({message: 'Book not found'});
     }
     res.end();
})

/*
 * @desc Create a new book
 * @route /api/books
 * @access Public
 * @method POST
*/ 
Book_Routes.post('/', function(req ,res) {
     const {error, value} = bookSchema.validate(req.body);
     if(error){
          return res.status(400).json({message: error.details[0].message});
     }
     const {title, author, year, genre} = req.body;
     const book = {id: BooksList.length + 1, title, author, year, genre};
     BooksList.push(book);
     // save BooksList to file
     fs.writeFileSync('books.json', JSON.stringify(BooksList));
     // return new book
     res.json(book).status(201);
     res.end();

});


/*
 * @desc Update a book by id
 * @route /api/books/:id
 * @access Public
 * @method PUT
*/
Book_Routes.put('/:id', function(req, res){
     const bookId = +req.params.id;
     const {title, author, year, genre} = req.body;
     const book = BooksList.find(book => book.id === bookId);
     const {error, value} = BookUpdateSchema.validate({title, author, year, genre});
     if(error){
          return res.status(400).json({message: error.details[0].message});
     }
     if(book){
          book.title = title ;
          book.author = author;
          book.year = year;
          book.genre = genre;
          // save BooksList to file
          fs.writeFileSync('books.json', JSON.stringify(BooksList));
          // return updated book
          res.json(book).status(200);
     }else{
          res.status(404).json({message: 'Book not found'});
     }
     res.end();
});

/*
 * @desc Delete a book by id  
 * @route /api/books/:id
 * @access Public
 * @method DELETE
*/

Book_Routes.delete('/:id', function(req, res){
     const bookId = +req.params.id;
     const bookIndex = BooksList.findIndex(book => book.id === bookId);
     if(bookIndex !== -1){
          BooksList.splice(bookIndex, 1);
          // save BooksList to file
          fs.writeFileSync('books.json', JSON.stringify(BooksList));
          // return success message
          res.json({message: 'Book deleted successfully'}).status(200);
     }else{
          res.status(404).json({message: 'Book not found'});
     }
     res.end();
});

/*
 * @desc Export Book_Routes
 * @access Public
*/
module.exports = Book_Routes;
