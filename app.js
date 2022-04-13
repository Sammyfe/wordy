const express = require('express');
const mongoose = require('mongoose');
const { mainRouter } = require('./routes/mainRoutes');
const { postRouter } = require('./routes/postRoutes');
const { Post } = require('./models/post');
const dotevn = require(dotenv).config();

const app = express();

const PORT = process.env.PORT || 5000;

// setting the app defaults
app.set('view engine', 'ejs');

// setting up middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// connecting to the database
dbURI = 
    'mongodb+srv://Titilope:cholatrek@sammyfe.bgevw.mongodb.net/wordy?retryWrites=true&w=majority';
    mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`App is listening on port 5000 ${PORT}......`);
        });
    })
    .catch ((error) => console.log(error));

// Everything related to created, reading, updating, and deleting, posts
app.use('/posts', postRouter);

// everything relating to home, about, and 404
app.use(mainRouter);