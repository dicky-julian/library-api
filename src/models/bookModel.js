const db = require('../helpers/mysql');
const table = 'book';

module.exports = {
    getBookM: ((query) => {
        let querySrc = `SELECT * FROM ${table}`;
        let queryPage = {
            startPage: (query.page - 1) * 9
        }

        if (query.title || query.status || query.id_genre) querySrc = querySrc.concat(` WHERE title LIKE'%${query.title || null}%' OR status='${query.status || null}' OR id_genre='${query.id_genre || null}' `);

        if (query.order) querySrc = querySrc.concat(` ORDER BY ${query.order}`);
        if (query.orderType) querySrc = querySrc.concat(` ${query.orderType}`);
        if (query.page) {
            querySrc = querySrc.concat(` LIMIT ${queryPage.startPage}, 9`);
        } else if (query.limit) {
            querySrc = querySrc.concat(` LIMIT ${parseInt(query.limit)}`);
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
            db.query(`INSERT INTO ${table} (title, description, image, id_genre, id_author, release_date, rating, status) VALUES ("${data.title}", "${data.description}", "${data.image}", ${data.id_genre}, ${data.id_author}, "${data.release_date}", ${data.rating}, 1)`, ((err, result) => {
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