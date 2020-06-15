const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
    getToken: ((data, options) => {
        return new Promise((resolve, reject) => {
            if (!data) data = {};
            jwt.sign(data, config.jwt.secret, options, ((err, token) => {
                if (err) reject(err);
                resolve(token);
            }))
        })
    }),
    verifyToken: ((token) => {
        return new Promise((resolve, reject) => {
            if (!token) throw new Error("No token provided");
            jwt.verify(token, config.jwt.secret, ((err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            }));
        })
    })
}