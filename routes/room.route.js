const express = require('express');
const router = express.Router();

const {
    createRoom,
    editRoom,
    deleteRoom,
    fetchOne,
    fetchAll,
} = require('../controllers/room.controller');

router.post('/', createRoom);
router.get('/:id', fetchOne);
router.patch('/:id', editRoom);
router.delete('/:id', deleteRoom);
router.get('/', fetchAll);

module.exports = router;