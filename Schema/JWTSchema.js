const mongoose = require('mongoose');

const JWTSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('tokens', JWTSchema);