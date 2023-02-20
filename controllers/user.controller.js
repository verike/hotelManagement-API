const UserService = require('../services/user.service');

class UserController {

    // Create a user
    async createUser(req, res) {
        const reqBody = req.body;
        console.log(reqBody)

        // Check if the user exists
        // If not, create user and send a response

        const existingUser = await UserService.fetchOne({
            name: reqBody.name.toLowerCase()
        });

        if (existingUser) res.status(403).json({
            success: false,
            message: 'User already exist'
        })
        
        const newUser = UserService.createUser(reqBody);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser,
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
    
        // Since book name is unique key, we have to make it consistent
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
        const reqBody = req.body;

        const existingUsers = await UserService.fetchAll({})

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: existingUsers
        });
    }
}

module.exports = new UserController;