const helper = require('../helpers');
const User = require('../models/userModel');

module.exports = {
    getUserC: (async(req, res) => {
        try {
            const result = await User.getUserM();
            return helper.setResponse(res, result, 'Successfully got Users data');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}