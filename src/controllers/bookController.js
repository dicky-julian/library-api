const helper = require('../helpers');
const Book = require('../models/bookModel');

module.exports = {
    getBookC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Book.getBookM(query);
            return helper.setResponse(res, result, 'Succes to get Book');
        } catch (err) {
            console.log(err);
            return helper.setResponse(res, err.message, false);
        }
    }),
    getBookByIdC: (async(req, res) => {
        const id = req.params.id;
        try {
            const result = await Book.getBookByIdM(id);
            return helper.setResponse(res, result, `Success to get Book with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    addBookC:(async(req, res) => {
        try {
            if (!req.file) throw new Error('Book`s image can`t be  empty');
            await helper.isEmpty(req.body);
            const dataBook = {
                id: null,
                ...req.body,
                image: req.file.filename
            }
            const result = await Book.addBookM(dataBook);
            dataBook.id = result.insertId;

            return helper.setResponse(res, dataBook, 'Success to add Book to Database');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),

}