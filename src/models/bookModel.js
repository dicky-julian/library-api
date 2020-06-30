const db = require('../helpers/mysql');
const table = 'book';

module.exports = {
    getBookM: ((query) => {
        let querySrc = `SELECT * FROM ${table}`;
        let queryPage = {
            startPage: (query.page - 1) * 10
        }

        if (query.title || query.status) querySrc = querySrc.concat(` WHERE title LIKE'%${query.title || null}%' OR status='${query.status || null}'`);
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
    getBookByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table} WHERE id=${id}`, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: `Book with id ${id} can't found`});
                resolve(result);
            }));
        })
    }),
    addBookM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} (title, description, image, id_genre, id_author, release_date, rating, status) VALUES ("${data.title}", "${data.description}", "${data.image}", ${data.id_genre}, ${data.id_author}, "${data.release_date}", 9, 1)`, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    }),
    updateBookByIdM: ((data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }))
        })
    }),
    deleteBookByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM ${table} WHERE id=?`, id, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }))
        })
    })
}