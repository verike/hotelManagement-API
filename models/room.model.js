const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    roomType: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['luxury suite', 'premium suite', 'standard suite']
    },
    price: {
            type: Number,
            required: true,
    }
})

module.exports =  mongoose.model('room', roomSchema);