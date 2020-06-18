const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, `${__dirname}./../public/images/`)
    }),
    filename: ((req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    })
});

let upload = multer({
    storage: storage
}).single('image');

module.exports = {
    upload,
};