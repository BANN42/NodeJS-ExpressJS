const Joi = require('joi');

const AuthorsRules = Joi.object({
     firstName : Joi.string().min(2).max(50).required(),
     lastName : Joi.string().min(2).max(50).required(),
     nationality : Joi.string().min(2).max(50).required(),
     img : Joi.string().required(),
});


const UpdateAuthorsRules = Joi.object({
     firstName : Joi.string().min(2).max(50),
     lastName : Joi.string().min(2).max(50),
     nationality : Joi.string().min(2).max(50),
     img : Joi.string(),
     });


     
module.exports = {
     AuthorsRules,
     UpdateAuthorsRules
};
