const express = require('express');
const mongoose = require('mongoose');
const { Post } = require('./models/post');
const { postRouter } =require('./routes/postRoutes');
const { mainRouter } =require('./routes/mainRoutes');

const app = express();

//setting the app default
app.set('view engine', 'ejs');

//setting middlewares if you wrote ur css code yourself
app.use(express.static('./public'));
//to get our data from req.body, we make use of our middleware which is express built
app.use(express.urlencoded({ extended: true }));

//connecting to the database
dbURI = 
    'mongodb+srv://Titilope:cholatrek@sammyfe.bgevw.mongodb.net/wordy?retryWrites=true&w=majority';
    mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(5000, () => {
            console.log('App is listening on port 5000.....');
        });
    })
    .catch ((error) => console.log(error));
   
//everything relating to home, about and 404
app.use(mainRouter);

  // files related to routes
app.use(postRouter);



  
