const RoomModel = require('../models/roomType.model');

class RoomService {
    
    // Create a room
    async createRoom (data) {
        return await RoomModel.create(data)
    }

    // Edit a room
    async updateRoom (id, updateData) {
        return await RoomModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a room
    async deleteRoom(id){
        return await RoomModel.findByIdAndDelete(id)
    }

    // Fetch a single room
    async fetchOne(filter){
        return await RoomModel.findOne(filter)
    }

    // Fetch all rooms
    async fetchAll(filter){
        return await RoomModel.find(filter);
    }

}

module.exports = new RoomService;