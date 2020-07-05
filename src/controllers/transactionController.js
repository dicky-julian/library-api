const helper = require('../helpers');
const Book = require('../models/bookModel');
const Transaction = require('../models/transactionModel');

module.exports = {
    borrowC: (async (req, res) => {
        const data = req.body;
        try {
            await helper.isEmpty(data);
            const result = await Book.getBookByIdM(data.id_book);
            const status = result[0].status;

            if (status === 1) {
                data.status = 2;
            } else {
                data.status = 1;
            }

            await Book.updateBookByIdM({status: data.status}, data.id_book);
            await Transaction.borrowM(data);
            return helper.setResponse(res, data, 'Succesfully added transaction');
        } catch (err) {
            return helper.setResponse(res, err.message, false);
        }
    })
}