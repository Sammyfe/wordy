const {User} = require('../models/user')
const helpers = require('../utilities/auth')

const renderRegisterUser = ((req, res ) => {
    return res.render('register')
});

const renderLoginUser = ((req, res ) => {
    return res.render('login')
});


const registerUser = async (req, res ) => {
    try{
        const body = req.body;

        //validation on the server
        if (!body.firstName || !body.lastName || !body.email || !body.password) {
            //sending an error message
            req.flash('error','Please provide all information');
            return res.status(400).redirect('/auth/register');
        };
        //storing user password...password hashing using bcript.....auth.js
        //modify password
        body.password = helpers.generatePasswordHash(body.password);
        //making the gmail case insensitive
        body.email = body.email.toLowerCase();
        //validating that someone hasnt used the email before
        const isExisting = await User.findOne({ email: body.email });

        if (isExisting) {
            //sending an error message of email duplicate...email already in use
            req.flash('error','User already exist, Please sign up');
            return res.status(400).redirect('/auth/register');
        }
        //new user
        await new User(body).save();
        //sending a success message
        req.flash('success', 'Registration successful, Please sign in');
        return res.status(201).redirect('/auth/login');
    } catch(error) {
        //sending a failed message
        req.flash('error','There seems to be a problem');
        return res.status(500).redirect('/auth/register');
    };
};


module.exports = {
    renderRegisterUser,
    registerUser,
    renderLoginUser,
}