const jwt = require('jsonwebtoken');
const config = require('../config');
const helper = require('../helpers');

module.exports = {
    verifyJwt: ((req, res, next) => {
        const token = req. headers.authorization;
        console.log(token);
        try {
            const decoded = jwt.verify(token, config.jwtSecretKey);
            console.log(decoded);
            req.decodedToken = decoded;
            next();
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}