const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const roomTypeSchema = new Schema ({
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
});

module.exports = mongoose.model('roomType', roomTypeSchema);