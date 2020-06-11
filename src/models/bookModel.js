const db = require('../helpers/mysql');
const table = 'book';

module.exports = {
    getBookM: ((query) => {
        let querySrc = `SELECT * FROM ${table}`;
        let queryBook = {
            title: null,
            status: null,
        }
        let queryPage = {
            startPage: (query.page - 1) * 10
        }

        if (query.title) queryBook.title = query.title;
        if (query.status) queryBook.status = query.status;
        querySrc = querySrc.concat(` WHERE title LIKE'%${queryBook.title}%' OR status='${queryBook.status}'`)

        if (query.order) querySrc = querySrc.concat(` ORDER BY ${query.order}`);
        if (query.page) querySrc = querySrc.concat(` LIMIT ${queryPage.startPage}, 10`);

        return new Promise((resolve, reject) => {
            db.query(querySrc, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: `Data can't found`});
                resolve(result);
            }));
        })
    }),
    getBookByIdM: ((id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table} WHERE id=${id}`, ((err, result) => {
                if (err) reject(err);
                if (!result.length) reject({message: `Data with id ${id} can't be found`});
                resolve(result);
            }));
        })
    }),
    addBookM: ((data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO ${table} (title, description, image, id_genre, id_author, status) VALUES ('${data.title}', '${data.description}', '${data.image}', ${data.id_genre}, ${data.id_author}, 1)`, ((err, result) => {
                if (err) reject(err);
                resolve(result);
            }));
        })
    })
}