const helper = require('../helpers');
const Book = require('../models/bookModel');

module.exports = {
    getBookC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Book.getBookM(query);
            return helper.setResponse(res, result, 'Successfully got Book');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    getBookByIdC: (async(req, res) => {
        const id = req.params.id;
        try {
            const result = await Book.getBookByIdM(id);
            return helper.setResponse(res, result, `Successfully got Book with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    addBookC:(async(req, res) => {
        try {
            if (!req.file) throw new Error('Image can`t be  empty');
            await helper.isEmpty(req.body);
            const dataBook = {
                id: null,
                ...req.body,
                image: req.file.filename
            }
            const result = await Book.addBookM(dataBook);
            dataBook.id = result.insertId;

            return helper.setResponse(res, dataBook, 'Successfully added Book');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    updateBookByIdC: (async (req, res) => {
        const data = req.body;
        const id = req.params.id;
        const dataBook = {
            id: id,
            ...data
        }
        try {
            await helper.isEmpty(data);
            const getDataBook = await Book.getBookByIdM(id);
            if (req.file) {
                helper.unlinkFile(`${__dirname}./../public/images/${getDataBook[0].image}`);
                dataBook.image = req.file.filename
            }
            await Book.updateBookByIdM(dataBook, id);
            return helper.setResponse(res, dataBook, `Successfully updated Book with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    deleteBookByIdC: (async(req, res) => {
        const id = req.params.id;
        try {
            const getDataBook = await Book.getBookByIdM(id);
            helper.unlinkFile(`${__dirname}./../public/images/${getDataBook[0].image}`);
            await Book.deleteBookByIdM(id);
            return helper.setResponse(res, '', `Success to delete Author with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}