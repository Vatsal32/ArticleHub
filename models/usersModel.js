const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }, email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    }, password: {
        type: String,
        trim: true,
        required: true
    }, verifyEmail: {
        type: Boolean,
        default: false,
        required: true
    }
});



module.exports = mongoose.model('users', userSchema);