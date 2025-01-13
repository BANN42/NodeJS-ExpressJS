const express = require('express');
const app = express();
const {idNotValide , routeNotFound} = require('./middlewares/errors')
app.use(express.json())
const dotenv = require('dotenv');
dotenv.config();
//connect With DB
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_STRING, {
     bufferCommands: false,
     serverSelectionTimeoutMS: 30000
}
).then(() => console.log('Connected'))
.catch((err) => console.log("Something went wrong ", err));

// books Router
const Book_Routes = require('./routes/Routes_Books');
const routerAuthors = require('./routes/Routes_Authors');
const Router_Users = require('./routes/Routes_Users');


// books routes
app.use('/api/books', Book_Routes);

// authors routes
app.use('/api/authors', routerAuthors);

// auths routes
app.use('/api/auth', Router_Users);
// middlewares
// app.use(routeNotFound);
// app.use(idNotValide);

app.use((req, res, next) => {
     res.status(404).json({
          message: "Page not found"
     });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
          console.log(`Server running on port ${port}`);
});
