const express = require('express');
// creating the router
const authRouter = express.Router();
const authController = require('../controller/authController.js');

// new post
authRouter.get('/register', authController.renderRegisterUser);
authRouter.post('/register', authController.registerUser);
authRouter.get('/login', authController.renderLoginUser);



// exporting our authRouter
module.exports = { authRouter };