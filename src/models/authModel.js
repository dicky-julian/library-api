const db = require('../helpers/mysql');
const table = 'users';

module.exports = {
    registerM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} SET ?`, data, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }))
        })
    })
}