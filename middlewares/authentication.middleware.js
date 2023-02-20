const jwt = require('jsonwebtoken');
const {userModel} = require('../models/user.model')

class Authentication {

    async authenticate(req, res, next) {
        const token = req.header('token');

        if (!token) return res.status(401).json({ success: false, message: 'Access Denied: Token not provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(404).json({ success: false, message: 'user not found or might have been deleted' });

        req.auth = user;

        return next();

    }

    async isPermittedTo (action, resource) {

    }

}

module.exports = new Authentication();