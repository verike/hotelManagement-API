const UserModel = require('../models/user.model');

class UserService {
    
    // Create a user
    async createUser (data) {
        return await UserModel.create(data)
    }

    // Edit a user
    async updateUser (id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a user
    async deleteUser(id){
        return await UserModel.findByIdAndDelete(id)
    }

    // Fetch a single user
    async fetchOne(filter){
        return await UserModel.findOne(filter)
    }

    // Fetch all users
    async fetchAll(filter){
        return await UserModel.find(filter);
    }

}

module.exports = new UserService;