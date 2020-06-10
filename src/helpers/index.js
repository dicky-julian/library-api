module.exports = {
    setResponse: ((res, data, status) => {
        const result = {};
        result.status = status ? 200 : 400;
        result.message = status ? status : "Fail";
        result.data = data || '';

        return res.status(result.status).json({
            status: result.status,
            message: result.message,
            data: result.data
        });
    }),
    isEmpty: (async(data) => {
        for (let item in data) {
            if (!data[item]) throw new Error(`Column ${item} can't be empty`);
        }
    })
}