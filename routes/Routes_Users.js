const express = require('express');
const Router_Users = express.Router();
const asyncHandler = require('express-async-handler');

const {validateLogin, validationRegister, validateUpdateUser} = require('../Validation/userValidation')
const User = require('../Models/User');

// register
Router_Users.post('/register', asyncHandler(
     async function (req, res) {
          const { error } = validationRegister(req.body);
          if (error) {
               return res.status(400).json({ message: error.details[ 0 ].message });
          }

          let isAlearyRegistered = await User.findOne({ email: req.body.email });
          if (isAlearyRegistered) {
               res.status(400).json({message  : "User Already There"})
          }

          return res.status(201).json({message : " تم التسجيل بنجاح "})
     }
))



module.exports = Router_Users;
