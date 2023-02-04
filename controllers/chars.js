const Char = require('../models/chars');

function index(req, res, next) {
    Char.find({}).sort({createdAt: -1}).exec(function(err, chars) {
        if (err) {
            console.log(err);
            res.redirect('/');
        };
        
        res.render('index', {
            chars
        });
    });
};

module.exports = {
    index
};