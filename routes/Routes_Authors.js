const express = require('express');
const routerAuthors = express.Router();




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

routerAuthors.get('/' , async  function(req, res){
     try{
          const authorsList = await Author.find();
          res.status(200).json(authorsList);
          res.end();
     }catch(error){
          console.log(error)
          res.status(500).json({message: 'Internal Server Error'});
     }
});


/*
     * @desc Get author by id
     * @route  /api/authors/:id
     * @access Public
     * @method GET
*/

routerAuthors.get('/:id', async function(req, res){
     try {
         const author = await Author.findById(req.params.id);
         if (!author) return res.status(404).json({ message: "Author not found" });
         res.status(200).json(author);
         res.end();
     } catch (arror) {
          console.log(arror);
          res.status(500).json({ message: "Internal Server Error" });
          res.end();
    }
});

/*
     * @desc Create new author
     * @route  /api/authors
     * @access Private
     * @method POST
*/
routerAuthors.post('/', async function(req, res){
     const {firstName, lastName, nationality, img} =  req.body;
     const { error } = AuthorsRules.validate(req.body);
     if (error) {
     console.log(error);
          return res.status(400).json({ "message": error.details[ 0 ].message });
     };
     
     try {
          const newAuthor = new Author({
               firstName,
               lastName,
               nationality,
               img
          });
         
         const result = await newAuthor.save();
         
    res.json(result).status(201);
    res.end();
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
        res.end();
     };
});
    
/*
     * @desc Update author by id
     * @route  /api/authors/:id
     * @access Private
     * @method PUT
*/
routerAuthors.put('/:id', async function(req, res){
     try {
          const authorUpdate = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!authorUpdate) return res.status(404).json({ message: "Author not found" });
          res.status(200).json(authorUpdate);
          res.end();
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Internal Server Error" });
          res.end();
     }
});


/*
     * @desc Delete author by id
     * @route  /api/authors/:id
     * @access Private
     * @method DELETE
*/
routerAuthors.delete('/:id', async function(req, res){
     try {
          const findAuthorDelete = await Author.findByIdAndDelete(req.params.id);
          if (!findAuthorDelete) return res.status(404).json({ message: "Author not found" });
          res.status(200).json({ message: "Author deleted successfully" });
          res.end();
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Internal Server Error" });
          res.end();
     }
});

module.exports = routerAuthors;
