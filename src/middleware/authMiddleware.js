const jwt = require('../helpers/jwt');
const helper = require('../helpers');

module.exports = {
    verifyJwt: (async(req, res, next) => {
        const token = req.headers.authorization;
        try {
            req.decoded = await jwt.verifyToken(token);
            next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                const newToken = await jwt.getToken(null, {expiresIn: 30});
                const data = {
                        errMsg: err.name,
                        token: newToken
                    };
                return helper.setResponse(res, data, false);
            }
            return helper.setResponse(res, err.message, false);
        }
    })
}