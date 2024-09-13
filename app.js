const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 3000;

app.use(express.json());

const ReadFileSync = (filePath) => {
     return fs.readFileSync(filePath, 'utf8');
}

const BooksList = JSON.parse(ReadFileSync('books.json'));





// get All Books
app.get('/api/books', function(req, res){
     res.json(BooksList).status(200);
     res.end();
}) 

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



app.listen(port, () => {
          console.log(`Server running on port ${port}`);
});
