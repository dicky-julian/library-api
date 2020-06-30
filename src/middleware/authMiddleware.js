const jwt = require('../helpers/jwt');
const jwt_decode = require('jwt-decode');
const helper = require('../helpers');

module.exports = {
    verifyJwt: (async (req, res, next) => {
        const token = req.headers.authorization;
        try {
            req.decoded = await jwt.verifyToken(token);
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                const decoded = jwt_decode(token);
                const decodedData = {
                    role: decoded.role
                }
                req.decoded = decodedData;
                const newToken = await jwt.getToken(decodedData, { expiresIn: 31000 });
                const data = {
                    errMsg: err.name,
                    refreshToken: newToken
                };
                return helper.setResponse(res, data, false);
            }
            return helper.setResponse(res, err.message, false);
        }
    }),
    verifyAdmin: ((req, res, next) => {
        const decoded = req.decoded;
        const role = decoded.role;
        const data = {
            errMsg: 'PermissionError'
        }
        if (role !== 'admin') return helper.setResponse(res, data);
        next();
    })
}