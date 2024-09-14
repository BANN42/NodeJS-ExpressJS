const express = require('express');
const fs = require('node:fs');
/* create HTTP Routes */
const routerAuthors = express.Router();
/* Reading Json File Authors Contents */ 
const  {readJsonContent} = require('../features/readFromJsonFile')




/* Authors Content  */
const Authors = JSON.parse( readJsonContent('./api/authors.json'));


/* validation Authors */
const {AuthorsRules, UpdateAuthorsRules} = require('../models/validationAuthors')

/*
 * @desc Get all authors
 * @route  /api/authors
 * @access Public
 * @method GET
*/

routerAuthors.get('/' , function(req, res){
     res.json(Authors).status(200);
     res.end();
});


/*
     * @desc Get author by id
     * @route  /api/authors/:id
     * @access Public
     * @method GET
*/

routerAuthors.get('/:id', function(req, res){
    const id = req.params.id;
    const author = Authors.find(author => author.id === id);
    if(author){
        res.json(author).status(200);
        res.end();
    }else{
        res.status(404).json({message: 'Author not found'});
        res.end();
    }
});

/*
     * @desc Create new author
     * @route  /api/authors
     * @access Private
     * @method POST
*/
routerAuthors.post('/', function(req, res){
    const {firstName, lastName, nationality, img} = req.body;
    const {error} = AuthorsRules(req.body);
    if(error){
     return res.status(400).json({"message": "Can't Add the Author"})
    }
     
    const newAuthor = {
     id : Authors.length + 1,
     firstName,
     lastName,
     nationality,
     img
    }
    Authors.push(newAuthor);
    res.json(newAuthor).status(201);
    res.end();
});
    
/*
     * @desc Update author by id
     * @route  /api/authors/:id
     * @access Private
     * @method PUT
*/
routerAuthors.put('/:id', function(req, res){
    const id = req.params.id;
    const author = Authors.find(author => author.id === id);
    if(author){
        const {error} = UpdateAuthorsRules(req.body);
        if(error){
            return res.status(400).json({"message": "Can't Update the Author"})
        }
        const {firstName, lastName, nationality, img} = req.body;
        author.firstName = firstName;
        author.lastName = lastName;
        author.nationality = nationality;
        author.img = img;
        res.json(author).status(200);
        res.end();
    }else{
        res.status(404).json({message: 'Author not found'});
        res.end();
    }
});

/*
     * @desc Delete author by id
     * @route  /api/authors/:id
     * @access Private
     * @method DELETE
*/
routerAuthors.delete('/:id', function(req, res){
    const id = req.params.id;
    const author = Authors.find(author => author.id === id);
    if(author){
        Authors.splice(Authors.indexOf(author), 1);
        res.json({message: 'Author deleted successfully'}).status(200);
        res.end();
    }else{
        res.status(404).json({message: 'Author not found'});
        res.end();
    }
});

module.exports = routerAuthors;
