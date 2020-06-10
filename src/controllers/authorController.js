const helper = require('../helpers');
const Author = require('../models/authorModel');

module.exports = {
    getAuthorC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Author.getAuthorM(query);
            return helper.setResponse(res, result, "Success to get Author")
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    getAuthorByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            const result = await Author.getAuthorByIdM(id);
            if (result.length) return helper.setResponse(res, result, `Success to get Author with id ${id}`);
            throw new Error(`Author with id ${id} not found`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    addAuthorC: (async (req, res) => {
        const data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Author.addAuthorM(data);
            const newData = {
                id: result.insertId,
                ...data
            };
            return helper.setResponse(res, newData, "Success to add Author");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    updateAuthorByIdC: (async (req, res) => {
        const data = req.body;
        const id = req.params.id;
        try {
            await helper.isEmpty(data);
            const result = await Author.updateAuthorByIdM(id, data);
            if (!result.changedRows) throw new Error(`Can't update cause id isn't found or your input is same with current data`);
            const newData = {
                id: id,
                ...data
            };
            return helper.setResponse(res, newData, `Success to update Author with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    deleteAuthorByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            const result = await Author.deleteAuthorByIdM(id);
            if (!result.affectedRows) throw new Error(`Can't delete cause id isn't found`);
            return helper.setResponse(res, '', `Success to delete Author with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}