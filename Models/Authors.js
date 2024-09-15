const mongoose = require('mongoose');

 const AuthorSchema = new mongoose.Schema({
     firstName : {
          type: String,
          required: true,
          trim: true,
          minlength : 3,
          maxlength : 50,
     },
     lastName : {
          type: String,
          required: true,
          trim: true,
          minlength : 3,
          maxlength : 50,
     },
     nationality : {
          type: String,
          required: true,
          trim: true,
          minlength : 3,
          maxlength : 50,
     },
     img : {
          type: String,
          required: true,
          trim: true,
      }
      
 }, {
     timestamps: true
});


const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
