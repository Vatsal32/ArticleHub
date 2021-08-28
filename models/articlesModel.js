const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('articles', articleSchema);