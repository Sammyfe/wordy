//we are using the app objects and there is no app in this folder, what we can do now is to use express router
// we bring in express
const express = require('express');

const postRouter = express.Router();
// everywhere we have app.get, we change it to router.get
const { Post } = require('../models/post');
const postController = require('../controller/postController');





// crud operation
  // to use router (organizing our post we'll have to assign  'post' in front each route so that they can relate better with each other)
  // to get the post
postRouter.get('/posts/new_post', (req, res) =>{
    res.render('new_post');
    res.redirect('/');
});

//publish new post
postRouter.post('/posts/new_post', async (req, res) => {
    //how to save data to the database
    try {
        const post = new Post(req.body)
        result = await post.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

//retrive single post// how to know which post the user is trying to read, we'll use query parameter
// read parameters are like variables we can pass into our url, they are url parameters and they are always changing(ID is a url parameter and it can be anything)
postRouter.get('/post/read/:id', (req, res) => {
    const id =req.params.id;
    //console.log(ID);
    // there is something in mongoose that allows us to find a specific post
    Post.findById(id)
    .then(result => {
        res.render('post', { post: result });
    }) 
    .catch(error => {
        console.log(error);
    });
    //res.render('new_post')
});
//updating a post, WE are using get first because the user we first get the page before they update it
// we they now click on update, then then we now use put 
postRouter.get('/posts/update_post/:id', (req, res) => {
    // the first thing we want to do is to get the post the user is trying to update. we get the id of the post the user is trying to update
    const id = req.params.id; 
    Post.findById(id)
    .then(result => {
        res.render('update_post', { post: result });
    })
    .catch((error) => {
        console.log(error);
    });
});
// since the put request is not working on html we'll have to send the request through javascript to our database
postRouter.put('/posts/update_post/id', (req, res) =>{
    const id = req.params.id;
    Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });
});

//we create api to send request to our database
//we need to create api to delete our post
postRouter.delete('/posts/delete_post/:id', (req, res) => {
    const id = req.params.id;

    Post.findByIdAndDelete(id)
    //while using json we dont log error, we say res.json
        .then((result) => {
            res.json({
                status: true,
                message: 'Post deleted successfully',
                redirect: '/',
            });
        })
        .catch((error) => {
            res.status(404).json({
                status: false,
                error: 'unable to delete Post',
            });
    });
});
// router is organizing a project if the code base are getting large
//we make use of express.router

// then we'll have to export the post router
module.exports = { postRouter };
