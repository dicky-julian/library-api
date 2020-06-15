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
                let newToken = await jwt.getToken(null, {expiresIn: 30});
                return helper.setResponse(res, newToken, "Successfully Refresh Token");
            }
            return helper.setResponse(res, err.message, false);
        }
    })
}