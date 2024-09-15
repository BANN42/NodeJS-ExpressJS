const express = require('express');
const {bookSchema, BookUpdateSchema} = require('../Validation/validationRules.js');
const Book_Routes = express.Router();



const Book = require('../Models/Books.js');

/*
 * @desc Get all books 
 * @route /api/books
 * @access Public
 * @method GET
*/

Book_Routes.get('/', async function (req, res) {
     const books = Book.find();
     try {
          
          res.status(200).json(books);
          res.end();
     } catch (error) {
          console.log(error);
          res.status(500).json({message: 'Internal Server Error'});
          res.end();
     }
});


/*
  * @desc Get a single book by id
  * @route /api/books/:id
  * @access Public
  * @method GET
*/
Book_Routes.get("/:id", async (req, res) => {
     
     try {
          const BookId =  Book.findById(req.params.id);
          if (BookId) {
               res.status(200).json(BookId);
               res.end();
          } else {
               res.status(404).json({ message: 'Book not found' });
               res.end();
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({message: 'Internal Server Error'})
     }
})

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
Book_Routes.put('/:id', async function(req, res){
     try {
          const { error} = BookUpdateSchema.validate(req.body);
          if (!error) {
               const toUpdate = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
               if (toUpdate) {
                    res.status(200).json(toUpdate);
               } else {
                    res.status(404).json({ message: 'Book not found' });
               }
               res.end();
          } else {
               res.status(400).json({ message: error.details[0].message });
          }
          
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
    }
});

/*
 * @desc Delete a book by id  
 * @route /api/books/:id
 * @access Public
 * @method DELETE
*/

Book_Routes.delete('/:id', function(req, res){
     try {
          const bookId =  Book.findById(req.params.id);
          if(bookId){
               bookId.remove();
               res.json({message: 'Book deleted successfully'}).status(200);
          }else{
               res.status(404).json({message: 'Book not found'});
          }
          res.end();
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal Server Error' });
          res.end();
     }
});

/*
 * @desc Export Book_Routes 
 * @access Public
*/
module.exports = Book_Routes;
