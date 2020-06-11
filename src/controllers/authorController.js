const helper = require('../helpers');
const Author = require('../models/authorModel');

module.exports = {
    getAuthorC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Author.getAuthorM(query);
            return helper.setResponse(res, result, "Successfully got Author");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    getAuthorByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            const result = await Author.getAuthorByIdM(id);
            return helper.setResponse(res, result, `Successfully got Author with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    addAuthorC: (async (req, res) => {
        const data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Author.addAuthorM(data);
            const dataAuthor = {
                id: result.insertId,
                ...data
            };
            return helper.setResponse(res, dataAuthor, "Successfully added Author");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    updateAuthorByIdC: (async (req, res) => {
        const data = req.body;
        const id = req.params.id;
        const dataAuthor = {
            id: id,
            ...data
        }
        try {
            await helper.isEmpty(data);
            await Author.getAuthorByIdM(id);
            await Author.updateAuthorByIdM(dataAuthor, id);
            return helper.setResponse(res, dataAuthor, `Successfully updated Author with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    deleteAuthorByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            await Author.getAuthorByIdM(id);
            await Author.deleteAuthorByIdM(id);
            return helper.setResponse(res, '', `Successfully deleted Author with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}