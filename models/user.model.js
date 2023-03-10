const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Define user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        enum: ['guest', 'admin'],
        default: 'guest',
    },
    password: {
        type: String,
        required: true,
    },

})

// Define user validator function
const userValidator = async (user = {}) => {

    const schema = Joi.object({
        username: Joi.string().alphanum().min(5).max(30).required(),
        role: Joi.string().lowercase().valid('guest', 'admin'),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).min(8).required(),
    });

    const value = await schema.validateAsync(user);

    return value;
}

userSchema.pre('save', async function preSave (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


const userModel = mongoose.model('user', userSchema);
module.exports = {userModel, userValidator}