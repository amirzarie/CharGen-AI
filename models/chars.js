const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const charSchema = new Schema({
    imageURL: { type: String, require },
    prompt: { type: String, require },
    size: { type: String, require }
});

module.exports = mongoose.model('Char', charSchema);