const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    location:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    username:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        // required: true
    },
    age:{
        type: Number,
        // required: true
    },
    
});

module.exports = mongoose.model('User', userSchema);
