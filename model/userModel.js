const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 6
    },
    location: {
        type: String,
        required: true,
        maxlength: 255,
        minlength: 2
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    age: {
        type: Number,
        min: 18
    }
});

module.exports = mongoose.model('User', userSchema);
