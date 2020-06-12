const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const helper = require('../helpers');
const Auth = require('../models/authModel');
const User = require('../models/userModel');

module.exports = {
    registerC: (async(req, res) => {
        const userData = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(userData.password, salt);

        userData.password = hashPass;
        try {
            await Auth.registerM(userData);
            delete userData.password;
            return helper.setResponse(res, userData, 'Successfully created user');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    loginC: (async(req, res) => {
        const userData = req.body;
        try {
            const userByUname = await User.getUserByUnameM(userData.username);
            const hashPass = userByUname[0].password;
            const verifyPass = bcrypt.compareSync(userData.password, hashPass);
            if (!verifyPass) return helper.setResponse(res, 'Invalid Username or Password', false);

            delete userByUname[0].password;
            const tokenData = {
                ...userByUname[0]
            }
            const token = jwt.sign(tokenData, config.jwtSecretKey);
            userByUname[0].token = token;
            return helper.setResponse(res, userByUname, 'Successfully login to system');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}