const express = require('express');
const app = express();
app.use(express.json())
const dotenv = require('dotenv');
dotenv.config();
//connect With DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log('Connected'))
.catch((err) => console.log("Something went wrong "  ,err));

// books Router
const Book_Routes = require('./routes/Routes_Books');
const routerAuthors = require('./routes/Routes_Authors');


// books routes
app.use('/api/books', Book_Routes);

// authors routes
app.use('/api/authors', routerAuthors);




const port = process.env.PORT || 5000;
app.listen(port, () => {
          console.log(`Server running on port ${port}`);
});
 