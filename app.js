const express = require("express");
const mongoose = require("mongoose");
const { mainRouter } = require("./routes/mainRoutes");
const { postRouter } = require("./routes/postRoutes");
const { authRouter } = require("./routes/authRoutes");
const { Post } = require("./models/post");
const dotevn = require("dotenv").config();
const { newSession } = require("./middlewares/session");
const flash = require("connect-flash");

const app = express();

const PORT = process.env.PORT || 5000;

// setting the app defaults
app.set("view engine", "ejs");

// setting up middlewares
app.use(newSession);
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
//accessing local variables for views (flash)
app.use((req, res, next) => {
  //we'll define the locals,locals is a JSON  object we cn attend our own custom views to
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');
  //when a middleware is used in express, we have to define the next function
  next();
});

// connecting to the database
dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen( PORT, () => {
      console.log(`App is listening on port ${PORT}......`);
    });
  })
  .catch((error) => console.log(error));

// Everything related to created, reading, updating, and deleting, posts
app.use("/posts", postRouter);

app.use("/auth", authRouter);

// everything relating to home, about, and 404
app.use(mainRouter);
// flash message on the front end: error message
