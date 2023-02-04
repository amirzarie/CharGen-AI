const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, min: 0, max: 10, required: true },
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const charSchema = new Schema({
    imageURL: { type: String, require},
    prompt: { type: String, require },
    reviews: [reviewSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date }
});

module.exports = mongoose.model('Char', charSchema);