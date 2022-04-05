//it helps controll everythin related to post
// they're functions that handles every part of our application

const res = require("express/lib/response")

//creating controller
const get_new_post_form = (req, res) => {
    // we'll pass what we want the controller to do into this
    res.render('new_post');
}
// then we'll export, it
module.exports = {
    get_new_post_form
}