const Char = require('../models/chars');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const generate = async function(req, res) {
    const genImg = await openai.createImage({
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url"
    });

    req.body.imageURL = genImg.data.data[0].url;
    req.body.creator = req.user;
    req.body.creatorEmail = req.user.email;

    const char = new Char(req.body);
    char.save(function(err) {
        if (err) return res.send(err);
        res.render('gen', { char });
    });
};

function saveImage(req, res, next) {
    res.redirect('/');
};

function show(req, res, next) {
    Char.findById(req.params.id, function(err, char) {
        res.render('gen', {
            char,
            user: req.user
        });
    });
};

function saveReview(req, res) {
    req.body.rating = Number(req.body.rating);
    Char.findById(req.params.id, function(err, char) {
        req.body.reviewer = req.user;
        req.body.reviewerName = req.user.name;
        char.reviews.unshift(req.body);
        char.save(function(err) {
            res.redirect('/');
        });
    });
};

function deleteChar(req, res, next) {
    Char.findOneAndDelete({ "_id": req.params.id}, function(err) {
        if (err) {
            return res.redirect('/');
        };
        res.redirect('/');
    });
};

function deleteReview(req, res, next) {
    Char.findOne({ 'reviews._id': req.params.id }, function(err, char) {
        const reviewSubdoc = char.reviews.id(req.params.id);
        if (!reviewSubdoc.reviewer._id.equals(req.user._id)) return res.redirect('/');
        reviewSubdoc.remove();
        char.save(function(err) {
            res.redirect(`/gen/${char._id}`);
        });
    });
};

function showReview(req, res, next) {
    Char.findById(req.params.id, function(err, char) {
        char.reviews.forEach(function(r) {
            if (r.reviewer._id.equals(char.creator._id)) {
                res.render('reviewPage', {
                    r,
                    char
                });
            };
        });
    });
};

function updateReview(req, res, next) {
    Char.findById(req.params.id, function(err, char) {
        char.reviews.forEach(function(r) {
            if (r.reviewer._id.equals(char.creator._id)) {
                req.body.rating = Number(req.body.rating);
                req.body.reviewer = req.user;
                req.body.reviewerName = req.user.name;
                char.reviews.pop();
                char.reviews.unshift(req.body);
            };
        });
        char.save(function(err) {
            res.redirect('/');
        });
    });
};

module.exports = {
    generate,
    show,
    saveReview,
    saveImage,
    deleteChar,
    showReview,
    deleteReview,
    updateReview
};