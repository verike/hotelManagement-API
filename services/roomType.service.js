const roomTypeModel = require('../models/room.model');

class RoomTypeService {

    // Create a room type
    async createRoomType(roomData){
        return await roomTypeModel.create(roomData);
    }

    // Edit a room type
    async updateRoomType(id, updateData) {
        return await roomTypeModel.findByIdAndUpdate(id, updateData, {
            new: true
        });
    }

    // Delete a room type
    async deleteRoomType (id) {
        return await roomTypeModel.findByIdAndDelete(id);
    }

    // Fetch a single room type
    async fetchOne (filter) {
        return await roomTypeModel.findOne(filter);
    }

    // Fetch all room types
    async fetchAll(filter) {
        return await roomTypeModel.find(filter);
    }

}

module.exports = new RoomTypeService;