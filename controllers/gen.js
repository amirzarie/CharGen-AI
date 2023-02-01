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
        size: req.body.size,
        response_format: "url"
    });

    req.body.imageURL = genImg.data.data[0].url;

    const char = new Char(req.body);
    console.log(char);
    char.save(function(err) {
        if (err) return res.send(err);
        res.redirect('/');
    });
};

function show(req, res, next) {
    Char.findById(req.params.id, function(err, char) {
        res.render('gen', {
            char
        });
    });
};

module.exports = {
    generate,
    show
};