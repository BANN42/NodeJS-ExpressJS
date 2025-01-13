const Joi = require('joi');

const validationRegister = function (object) {
        const schema = Joi.object({
             username: Joi.string().trim().min(5).max(50).required(),
             email: Joi.string().trim().email().required(),
             password: Joi.string().min(8).max(100).required(),
             role: Joi.bool()
        });
        return schema.validate(object);
}


const validateLogin = function (object) {
     const schema = Joi.object({
          username: Joi.string().trim().min(5).max(50).required(),
          email : Joi.string().trim().email().required(),
          password: Joi.string().min(8).max(100).required()
     });

     return schema.validate(object);
}


const validateUpdateUser = function (object) {
     const schema = Joi.object({
          username: Joi.string().trim().min(5).max(50),
          email : Joi.string().trim().email(),
          password: Joi.string().min(8).max(100),
     })
}


module.exports = {
     validationRegister,
     validateLogin,
     validateUpdateUser
}
