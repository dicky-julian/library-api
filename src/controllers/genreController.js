const helper = require('../helpers');
const Genre = require('../models/genreModel');

module.exports = {
    getGenreC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Genre.getGenreM(query);
            return helper.setResponse(res, result, "Successfully got Genre");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    getGenreByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            const result = await Genre.getGenreByIdM(id);
            return helper.setResponse(res, result, `Successfully got Genre with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    addGenreC: (async (req, res) => {
        const data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Genre.addGenderM(data);
            const dataGenre = {
                id: result.insertId,
                ...data
            };
            return helper.setResponse(res, dataGenre, "Successfully added Genre");
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    updateGenreByIdC: (async (req, res) => {
        const data = req.body;
        const id = req.params.id;
        const dataGenre = {
            id: id,
            ...data
        }
        try {
            await helper.isEmpty(data);
            await Genre.getGenreByIdM(id);
            await Genre.updateGenreByIdM(dataGenre, id);
            return helper.setResponse(res, dataGenre, `Successfully updated Genre with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    deleteGenreByIdC: (async (req, res) => {
        const id = req.params.id;
        try {
            await Genre.getGenreByIdM(id);
            await Genre.deleteGenreByIdM(id);
            return helper.setResponse(res, '', `Successfully deleted Genre with id ${id}`);
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}