const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
     username: {
          type: String,
          trim: true,
          required: true,
          minLength: 5,
          maxLength: 50,

     },
     email: {
          type: String,
          trim: true,
          required: true,
          minLength: 5,
          maxLength: 255,
          unique: true,
     },
     password: {
          type: String,
          trim: true,
          required: true,
          minLength: 8,
          maxLength: 100,
     },
     isAdmin: {
          type: Boolean,
          default: false,
     },
}, {
     timestamps: true,
});
