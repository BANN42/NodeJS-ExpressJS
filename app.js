const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 3000;

app.use(express.json());
// app.set('strict routing', false)
const ReadFileSync = (filePath) => {
     return fs.readFileSync(filePath, 'utf8');
}

const BooksList = JSON.parse(ReadFileSync('books.json'));





// get All Books
app.get('/api/books', function(req, res){
     res.json(BooksList).status(200);
     res.end();
});


// get a single book by id
app.get('/api/books/:id', function(req, res){
     const bookId = +req.params.id;
     const book = BooksList.find(book => book.id === bookId);
     if(book){
          res.json(book).status(200);
     }else{
          res.status(404).json({message: 'Book not found'});
     }
     res.end();
})

// add book
app.post('/api/books', function(req ,res) {
     console.log(req.body);
     const {title, author, year, genre} = req.body;
     // create new Object Book
     const newBook = {
          id : BooksList.length + 1,genre,
          title, author, year :  parseInt(year)
     }
     try{
          // add new Book to BooksList
     BooksList.push(newBook);
     // save BooksList to file
     fs.writeFileSync('books.json', JSON.stringify(BooksList));
     // return new Book
     res.json(newBook).status(201);
     res.end();
     }catch(err){
          res.status(500).json({message: 'Error adding book', error: err});
          res.end();
     }
})

// update book 
app.put('/api/books/:id', function(req, res){
     const bookId = +req.params.id;
     const {title, author, year, genre} = req.body;
     const book = BooksList.find(book => book.id === bookId);
     if(book){
          book.title = title;
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
})

// delete book

app.delete('/api/books/:id', function(req, res){
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









app.listen(port, () => {
          console.log(`Server running on port ${port}`);
});
