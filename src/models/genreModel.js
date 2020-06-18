const db = require('../helpers/mysql');
const table = 'genre';

module.exports = {
    getGenreM: ((query) => {
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
    getGenreByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table} WHERE id=${id}`, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: `Genre with id ${id} can't found`});
                resolve(result);
            }));
        })
    }),
    addGenderM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} SET ?`, data, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    }),
    updateGenreByIdM: ((data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${table} SET ? WHERE id=?`, [data,id], ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    }),
    deleteGenreByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${table} WHERE id=?`, id, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    })
}