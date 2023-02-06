const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, min: 0, max: 10, required: true },
    comment: { type: String, required: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reviewerName: { type: String, require },
    createdAt: { type: Date }
});

const charSchema = new Schema({
    imageURL: { type: String, require},
    prompt: { type: String, require },
    reviews: [reviewSchema],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creatorEmail: { type: String, require },
    createdAt: { type: Date }
});

module.exports = mongoose.model('Char', charSchema);