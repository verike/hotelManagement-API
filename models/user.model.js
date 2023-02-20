const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        // enum: ['guest', 'admin'],
        default: 'guest',
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
})


const userValidator = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required().message('Username Required'),
    role: Joi.string().valid('guest', 'admin'),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).min(8).required().message('Minimum of 8 characters'),
    confirmPassword: Joi.ref('password').required().message('Confirm password'),
})


const userModel = mongoose.model('user', userSchema);
module.exports = {userModel, userValidator}