const RoomService = require('../services/room.service');

class RoomController {

    // Create a room
    async createRoom(req, res) {
        const reqBody = req.body;
        console.log(reqBody)

        // Check if the room exists
        // If not, create room and send a response

        const existingRoom = await RoomService.fetchOne({
            name: reqBody.name.toLowerCase()
        });

        if (existingRoom) res.status(403).json({
            success: false,
            message: 'Room already exist'
        })
        
        const newRoom = RoomService.createRoom(reqBody);

        res.status(201).json({
            success: true,
            message: 'Room created successfully',
            data: newRoom,
        })
    }

    // Edit a room
    async editRoom(req, res) {
        const roomId = req.params.id
        const updateData = req.body;

        // Check if room to be edited exist in the database
        
        const existingRoom = await RoomService.fetchOne({
            _id: roomId
        })
    
        if(!existingRoom) res.status(403).json({
            success: false,
            message: 'Room does not exist'
        })
    
        // Since book name is unique key, we have to make it consistent
        if(updateData.name){
            const existingRoomWithUpdateName = await RoomService.fetchOne({
                name: updateData.name.toLowerCase()
            })
        
            if (existingRoomWithUpdateName._id.toString() === existingRoom._id.toString()){
                res.status(403).json({
                    success: false,
                    message: 'Room with this name already exist'
                })
            }
        }
        const updatedData = await RoomService.updateRoom(roomId, updateData);
    
        res.status(200).json({
            success: true,
            message: 'Room updated successfully',
            data: updatedData,
        })
    }
    
    // Delete a room
    async deleteRoom(req, res) {
        const roomId = req.params.id

        // Check if the room to delete exist in the database
        const existingRoom = await RoomService.fetchOne({
            _id: roomId,
        });

        if(!existingRoom) res.status(403).json({
            success: false,
            message: 'Room does not exist',
        })

        const deletedRoom = RoomService.deleteRoom(roomId);

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully',
            data: deletedRoom,
        })

    }

    // Fetch a single room
    async fetchOne(req, res) {

        const roomId = req.params.id;

        // Check if the book to fetch exist in the database
        const existingRoom = await RoomService.fetchOne({
            _id: roomId,
        });

        if(!existingRoom) res.status(403).json({
            success: false,
            message: 'Room does not exist',
        })

        res.status(200).json({
            success: true,
            message: 'Room fetched successfully',
            data: existingRoom,
        })

    }

    // Fetch all rooms
    async fetchAll(req, res) {
        const reqBody = req.body;

        const existingRooms = await RoomService.fetchAll({})

        res.status(200).json({
            success: true,
            message: 'Rooms fetched successfully',
            data: existingRooms
        });
    }
}

module.exports = new RoomController;