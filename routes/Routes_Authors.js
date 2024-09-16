const express = require('express');
const routerAuthors = express.Router();
const asyncHandler = require('express-async-handler');



/* validation Authors */
const {AuthorsRules, UpdateAuthorsRules} = require('../Validation/validationAuthors')
/* database Collection */
const Author = require("../Models/Authors.js");

/*
 * @desc Get all authors
 * @route  /api/authors
 * @access Public
 * @method GET
*/

routerAuthors.get('/', asyncHandler(
     async function (req, res) {
          const authors = await Author.find();
          res.status(200).json(authors);
     }
)
);


/*
     * @desc Get author by id
     * @route  /api/authors/:id
     * @access Public
     * @method GET
*/

routerAuthors.get('/:id', asyncHandler(
     async function (req, res) {
         const author = await Author.findById(req.params.id);
         if (!author) return res.status(404).json({ message: "Author not found" });
         res.status(200).json(author);
}
));

/*
     * @desc Create new author
     * @route  /api/authors
     * @access Private
     * @method POST
*/
routerAuthors.post('/', asyncHandler(
     async function(req, res){
          const {firstName, lastName, nationality, img} =  req.body;
          const { error } = AuthorsRules.validate(req.body);
          if (error) {
          console.log(error);
               return res.status(400).json({ "message": error.details[ 0 ].message });
          };
          const newAuthor = new Author({
               firstName,
               lastName,
               nationality,
               img
          });
          const result = await newAuthor.save();
          res.json(result).status(201);
}
));
    
/*
     * @desc Update author by id
     * @route  /api/authors/:id
     * @access Private
     * @method PUT
*/
routerAuthors.put('/:id', asyncHandler(
     async function(req, res){
          const authorUpdate = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!authorUpdate) return res.status(404).json({ message: "Author not found" });
          res.status(200).json({ message: "Author updated successfully" });
}
));


/*
     * @desc Delete author by id
     * @route  /api/authors/:id
     * @access Private
     * @method DELETE
*/

routerAuthors.delete('/:id', asyncHandler(
     async function (req, res) {
          const findAuthorDelete = await Author.findByIdAndDelete(req.params.id);
          if (!findAuthorDelete) return res.status(404).json({ message: "Author not found" });
          res.status(200).json({ message: "Author deleted successfully" });
     })
);

module.exports = routerAuthors;
