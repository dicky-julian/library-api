const bcrypt = require('bcrypt');
const helper = require('../helpers');
const jwt = require('../helpers/jwt');
const Auth = require('../models/authModel');
const User = require('../models/userModel');

module.exports = {
    registerC: (async(req, res) => {
        const userData = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(userData.password, salt);

        userData.password = hashPass;
        try {
            await helper.isEmpty(userData);
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
            if (!verifyPass) return helper.setResponse(res, {errMsg: 'InvalidAuth'}, false);

            delete userByUname[0].password;
            const tokenData = {
                id: userByUname[0].id,
                username: userData.username,
                fullname: userByUname[0].fullname,
                role: userByUname[0].role
            }
            const token = await jwt.getToken(tokenData, {expiresIn: '7d'});
            tokenData.token = token;
            return helper.setResponse(res, tokenData, 'Successfully login to system');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}