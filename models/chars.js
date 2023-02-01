const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number },
    comment: { type: String, createdAt: new Date(0) }
});

const charSchema = new Schema({
    imageURL: { type: String, require, createdAt: new Date(0) },
    prompt: { type: String, require },
    size: { type: String, require },
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Char', charSchema);