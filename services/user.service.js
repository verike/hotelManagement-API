const {userModel} = require('../models/user.model');

class UserService {
    
    // Create a user
    async createUser (data) {
        return await userModel.create(data)
    }

    // Edit a user
    async updateUser (id, updateData) {
        return await userModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a user
    async deleteUser(id){
        return await userModel.findByIdAndDelete(id)
    }

    // Fetch a single user
    async fetchOne(filter){
        return await userModel.findOne(filter)
    }

    // Fetch all users
    async fetchAll(filter){
        return await userModel.find(filter);
    }

    // Check if user exist or not 
    async userExists(req){
        const userId = req.params.id
        const existingUser = await userModel.findOne({
            _id: userId,
        });   
        return !(_.isEmpty(existingUser)); 
    }

}

module.exports = new UserService;