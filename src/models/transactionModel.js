const db = require('../helpers/mysql');
const table = 'transaction';

module.exports = {
    getTransactionM: ((query) => {
        let querySrc = `SELECT * FROM ${table}`;
        let queryPage = {
            startPage: (query.page - 1) * 10
        }

        if (query.id_book || query.status) {
            querySrc = querySrc.concat(` WHERE id_book='${query.id_book || null}'  AND status='${query.status || 1}' `);
        }
        console.log(querySrc);
        if (query.order) querySrc = querySrc.concat(` ORDER BY ${query.order}`);
        if (query.orderType) querySrc = querySrc.concat(` ${query.orderType}`);
        if (query.page) {
            querySrc = querySrc.concat(` LIMIT ${queryPage.startPage}, 10`);
        } else if (query.limit) {
            querySrc = querySrc.concat(` LIMIT ${parseInt(query.limit)}`);
        }

        return new Promise((resolve, reject) => {
            db.query(querySrc, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: {errMsg: 'EmptyData'}});
                resolve(result);
            }));
        })
    }),
    getTransactionByIdUserM: ((query) => {
        let querySrc = `SELECT * FROM ${table}`;

        if (query.id_user || query.status) {
            querySrc = querySrc.concat(` WHERE id_user='${query.id_user || null}'  AND status='${query.status || 1}' `);
        }
        console.log(querySrc);

        return new Promise((resolve, reject) => {
            db.query(querySrc, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: {errMsg: 'EmptyData'}});
                resolve(result);
            }));
        })
    }),
    borrowM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} (title, image,  id_book, id_user, status) VALUES ('${data.title}', '${data.image}', '${data.id_book}', '${data.id_user}', 1)`, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }))
        })
    }),
    returnM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${table} SET ? WHERE id=?`, [{status: 2}, id], ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    })
}