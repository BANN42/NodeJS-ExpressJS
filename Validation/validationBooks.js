const Joi = require('joi');
/*
  This is the validation schema for the book model.
  It defines the rules for the book model fields.
*/
 const bookSchema = Joi.object({
     title: Joi.string().min(3).max(50).required(),
   author: Joi.string().required(),
   genre: Joi.string().min(3).max(50).required(),
   year: Joi.number().integer().min(1800).max(2022).required()
});

const BookUpdateSchema = Joi.object({
     title: Joi.string().min(3).max(50),
   author: Joi.string(),
   genre: Joi.string().min(3).max(50),
   year: Joi.number().integer().min(1800).max(2022)
   });

module.exports = {
     bookSchema,
     BookUpdateSchema
}
