const UserService = require('../services/user.service');
const {userModel, userValidator} = require('../models/user.model');
const bcrypt = require('bcrypt');
const _ = require('lodash');

class UserController {

    // Create a user
    async createUser(req, res) {
        const reqBody = req.body;

        const validData = await userValidator(reqBody);

        // Check if the user exists
        // If not, create user and send a response

        if(await UserService.userExists(validData)){
            return res.status(409).json({
                success: false,
                message: 'User already exist'})
        }
        
        const newUser = new userModel(validData);

        await newUser.save();

        const token = newUser.generateAuthToken();

        res.header('token', token).status(201).json({
            success: true,
            message: 'User created',
            data: {...newUser.toJSON(), token},
        })
    }

    // Edit a User
    async editUser(req, res) {
        const userId = req.params.id
        const updateData = req.body;

        // Check if User to be edited exist in the database
        
        const existingUser = await UserService.fetchOne({
            _id: userId
        })
    
        if(!existingUser) res.status(403).json({
            success: false,
            message: 'User does not exist'
        })
    
        // Since room name is unique key, we have to make it consistent
        if(updateData.name){
            const existingUserWithUpdateName = await UserService.fetchOne({
                name: updateData.name.toLowerCase()
            })
        
            if (existingUserWithUpdateName._id.toString() === existingUser._id.toString()){
                res.status(403).json({
                    success: false,
                    message: 'User with this name already exist'
                })
            }
        }
        const updatedData = await UserService.updateUser(userId, updateData);
    
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedData,
        })
    }
    
    // Delete a User
    async deleteUser(req, res) {
        const userId = req.params.id

        // Check if the User to delete exist in the database
        const existingUser = await UserService.fetchOne({
            _id: userId,
        });

        if(!existingUser) res.status(403).json({
            success: false,
            message: 'User does not exist',
        })

        const deletedUser = UserService.deleteUser(userId);

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: deletedUser,
        })

    }

    // Fetch a single User
    async fetchOne(req, res) {

        const userId = req.params.id;

        // Check if the book to fetch exist in the database
        const existingUser = await UserService.fetchOne({
            _id: userId,
        });

        if(!existingUser) res.status(403).json({
            success: false,
            message: 'User does not exist',
        })

        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: existingUser,
        })

    }

    // Fetch all Users
    async fetchAll(req, res) {
        // const reqBody = req.body;

        const existingUsers = await UserService.fetchAll({})

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: existingUsers
        });
    }

    // User login
    async login(req, res) {

        const user = await userModel.findOne({username: req.body.username});
        if (!user) return res.status(400).json({ success: true, message: 'Invalid username or password' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ success: false, message: 'Invalid username or password' });

        const token = user.generateAuthToken();

        res.header('token', token).status(200).json({success: true, message: 'login success', data: {...user.toJSON(), token }
        });
        
    }
}

module.exports = new UserController;