const router = require('express').Router();
const roomTypeRouter = require('../routes/roomType.route');
const roomRouter = require('../routes/room.route');
const userRouter = require('../routes/user.route')

router.use('/room-types', roomTypeRouter);
router.use('/rooms', roomRouter);
router.use('/users', userRouter);

module.exports = router;