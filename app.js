const express = require('express');
const app = express();
app.use(express.json())

// books Router
const Book_Routes = require('./routes/routeBooks');
const routerAuthors = require('./routes/routeAuthors');


// books routes
app.use('/api/books', Book_Routes);

// authors routes
app.use('/api/authors', routerAuthors);




const port = 3000;
app.listen(port, () => {
          console.log(`Server running on port ${port}`);
});
 