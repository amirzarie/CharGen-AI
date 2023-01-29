const Char = require('../models/chars');
const { Configuration, OpenAIApi } = require('openai');

Char.deleteMany({});

const configuration = new Configuration({
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const generate = async function(req, res) {
    const genImg = await openai.createImage({
        prompt: req.body.prompt,
        n: 1,
        size: req.body.size,
        response_format: "url"
    });

    req.body.Url = genImg.data.data[0].url;
    // res.redirect('/');

    // test code
    const char = new Char(req.body);
    console.log(char);
    char.save(function(err) {
        if (err) return res.send(err);
        res.redirect('/');
    });
    // 
};

module.exports = {
    generate
};