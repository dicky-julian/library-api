const db = require('../helpers/mysql');
const table = 'transaction';

module.exports = {
    borrowM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} (id_book, id_user, status) VALUES ('${data.id_book}', '${data.id_user}','${data.status}')`, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }))
        })
    })
}