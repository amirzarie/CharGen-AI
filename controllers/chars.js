const Char = require('../models/chars');

function index(req, res, next) {
    Char.find({}, function(err, chars) {
        if (err) {
            console.log(err);
            res.redirect('/');
        };
        console.log(chars);
        res.render('index', {
            chars
        });
    });
};

module.exports = {
    index
};