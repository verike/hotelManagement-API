const router = require('express').Router()
const {
    createRoomType,
    editRoomType,
    deleteRoomType,
    fetchAllRoomTypes,
} = require('../controllers/roomType.controller');

router.post('/', createRoomType);
router.get('/:id', editRoomType);
router.delete('/:id', deleteRoomType);
router.get('/', fetchAllRoomTypes);

module.exports = router;