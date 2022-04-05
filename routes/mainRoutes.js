const express = require('express');

const mainRouter = express.Router();
// everywhere we have app.get, we change it to router.get
const { Post } = require('../models/post');

 
 
 //homepage
 mainRouter.get('/', (req, res) => {
    // mongoose allows us to filter data based on asscending or decending order using sort
    Post.find().sort( {createdAt: -1} )
    .then(result => {
       // console.log(result);
       //to pass data into ejs, res.render already exist

        res.render('home', { posts: result });
    })
    .catch((error) =>{
        console.log(error);
    });
});


mainRouter.get('/about', (req, res) => {
res.status(404).render('about');
});

// handling our 404 page so to tell the user the page he/she is trying to get does not exist
mainRouter.all('*', (req, res) => {
res.status(404).render('404');
});

module.exports = { mainRouter };