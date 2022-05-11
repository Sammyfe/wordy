// express session is an utility middleware
const { Store } = require('express-session');
const MongoStore = require('connect-mongo');
var session = require('express-session')
// since we've required it, we have to call a function
const newSession = session({
    secret: 'Secret cookies',
    resave: true,
    saveUninitialized: true,
    cookie: {  maxAge: 24 * 60 * 1000 }, // the means you can only use the cookie across https//
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
});
// since we've defined session, we have to set it accross our user interface

module.exports = { newSession };
// we'll be needing user log  and user authentication for creating an account