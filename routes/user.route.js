const express = require('express');
const router = express.Router();

const {
    createUser,
    editUser,
    deleteUser,
    fetchOne,
    fetchAll,
} = require('../controllers/User.controller');

router.post('/', createUser);
router.get('/:id', fetchOne);
router.patch('/:id', editUser);
router.delete('/:id', deleteUser);
router.get('/', fetchAll);

module.exports = router;