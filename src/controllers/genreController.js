const helper = require('../helpers');
const Genre = require('../models/genreModel');

module.exports = {
    getGenreC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Genre.getGenreM(query);
            return helper.setResponse(res, result, "Succes to get Genre");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    getGenreByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            const result = await Genre.getGenreByIdM(id);
            if (result.length) return helper.setResponse(res, result, `Success to get Genre with id ${id}`);
            throw new Error(`Genre with id ${id} not found`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    addGenreC: (async (req, res) => {
        const data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Genre.addGenderM(data);
            const newData = {
                id: result.insertId,
                ...data
            };
            return helper.setResponse(res, newData, "Success to add Genre");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    updateGenreByIdC: (async (req, res) => {
        const data = req.body;
        const id = req.params.id;
        try {
            await helper.isEmpty(data);
            const result = await Genre.updateGenreByIdM(id, data);
            if (!result.changedRows) throw new Error(`Can't update cause id isn't found or your input is same with current data`);
            const newData = {
                id: id,
                ...data
            };
            return helper.setResponse(res, newData, `Success to update Genre with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    deleteGenreByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            const result = await Genre.deleteGenreByIdM(id);
            if (!result.affectedRows) throw new Error(`Can't delete cause id isn't found`);
            return helper.setResponse(res, '', `Success to delete Genre with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}