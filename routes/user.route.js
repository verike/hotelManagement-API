const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/authentication.middleware');

const {
    createUser,
    editUser,
    deleteUser,
    fetchOne,
    fetchAll,
    login,
} = require('../controllers/User.controller');

router.route('/')
    .get(fetchAll)
    .post(createUser)

router.route('/:id').all()
    .get(fetchOne)
    .patch([Auth.authenticate], editUser)
    .delete([Auth.authenticate], deleteUser)

router.post('/login', login)

// router.post('/', createUser);
// router.get('/:id', fetchOne);
// router.patch([Auth.authenticate],'/:id', editUser);
// router.delete([Auth.authenticate],'/:id', deleteUser);
// router.get('/', fetchAll);

module.exports = router;