const db = require('../helpers/mysql');
const table = 'author';

module.exports = {
    getAuthorM: ((query) => {
        let querySrc = `SELECT * FROM ${table}`;
        let queryPage = {
            startPage: (query.page - 1) * 10
        }

        if (query.name) querySrc = querySrc.concat(` WHERE name LIKE'%${query.name}%'`);
        if (query.order) querySrc = querySrc.concat(` ORDER BY ${query.order}`);
        if (query.page) querySrc = querySrc.concat(` LIMIT ${queryPage.startPage}, 10`);

        return new Promise((resolve, reject) => {
            db.query(querySrc, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: `Data is empty`});
                resolve(result);
            }));
        })
    }),
    getAuthorByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table} WHERE id=${id}`, id, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: `Data with id ${id} can't found`});
                resolve(result);
            }));
        })
    }),
    addAuthorM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} SET ?`, data, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    }),
    updateAuthorByIdM: ((data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    }),
    deleteAuthorByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${table} WHERE id=?`, id, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    })
}