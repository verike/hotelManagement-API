const RoomTypeService = require('../services/roomType.service');

class RoomTypeController {

    // Create a room type
    async createRoomType(req, res) {
        const reqBody = req.body;
        
        console.log(reqBody)

        // Check if the roomType exists
        // If not, create roomType and send a response

        const existingRoomType = await RoomTypeService.fetchOne({
            name: reqBody.name.toLowerCase()
        });

        if (existingRoomType) res.status(403).json({
            success: false,
            message: 'RoomType already exist'
        })
        
        const newRoomType = RoomTypeService.createRoomType(reqBody);

        res.status(201).json({
            success: true,
            message: 'RoomType created successfully',
            data: newRoomType,
        })
    }

    // Edit a room type
    async editRoomType(req, res) {
        const roomTypeId = req.params.id;
        const updateData = req.body;

        // Check if roomType to be edited exist in the database
        
        const existingRoomType = await RoomTypeService.fetchOne({
            _id: roomTypeId
        })
    
        if(!existingRoomType) res.status(403).json({
            success: false,
            message: 'RoomType does not exist'
        })
    
        // Since book name is unique key, we have to make it consistent
        if(updateData.name){
            const existingRoomTypeWithUpdateName = await RoomTypeService.fetchOne({
                name: updateData.name.toLowerCase()
            })
        
            if (existingRoomTypeWithUpdateName._id.toString() === existingRoomType._id.toString()){
                res.status(403).json({
                    success: false,
                    message: 'RoomType with this name already exist'
                })
            }
        }
        const updatedData = await RoomTypeService.updateRoomType(roomTypeId, updateData);
    
        res.status(200).json({
            success: true,
            message: 'RoomType updated successfully',
            data: updatedData,
        })
    }

    // Delete a room type
    async deleteRoomType(req, res) {
        const roomTypeId = req.params.id

        // Check if the room to delete exist in the database
        const existingRoomType = await RoomTypeService.fetchOne({
            _id: roomTypeId,
        });

        if(!existingRoomType) res.status(403).json({
            success: false,
            message: 'RoomType does not exist',
        })

        const deletedRoomType = RoomTypeService.deleteRoomType(roomTypeId);

        res.status(200).json({
            success: true,
            message: 'RoomType deleted successfully',
            data: deletedRoomType,
        })
    }


    // Fetch all room types
    async fetchAllRoomTypes(req, res) {
        const reqBody = req.body;

        const existingRoomTypes = RoomTypeService.fetchAll(reqBody);

        res.status(200).json({
            success: true,
            message: 'RoomTypes fetched successfully',
            data: existingRoomTypes,
        })
    }

}

module.exports = new RoomTypeController()