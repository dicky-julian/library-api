const helper = require('../helpers');
const Book = require('../models/bookModel');
const Transaction = require('../models/transactionModel');

module.exports = {
    getTransactionC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Transaction.getTransactionM(query);
            return helper.setResponse(res, result, 'Successfully got Transaction');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    getTransactionByIdUserC: (async (req, res) => {
        const query = req.query;
        try {
            const result = await Transaction.getTransactionByIdUserM(query);
            return helper.setResponse(res, result, 'Successfully got Transaction');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    borrowC: (async (req, res) => {
        let data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Book.getBookByIdM(data.id_book);
            const title = result[0].title;
            const status = result[0].status;
            const image = result[0].image;

            if (status === 2) {
                return helper.setResponse(res, {errMsg: 'UnavailableStore'}, false);
            }
            
            data = { ...data, title, image}

            await Book.updateBookByIdM({status: 2}, data.id_book);
            await Transaction.borrowM(data);
            return helper.setResponse(res, data, 'Succesfully added transaction');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    }),
    returnC: (async (req, res) => {
        let data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Transaction.getTransactionM({id_book: data.id_book});

            const idTransaction = result[0].id;
            await Book.updateBookByIdM({status: 1}, data.id_book);
            await Transaction.returnM(idTransaction);
            return helper.setResponse(res, data, 'Succesfully updated transaction');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}