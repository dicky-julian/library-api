const multer = require('multer');
const path = require('path');
const helper = require('./index');

function fileFilter(req, file, cb){
    const extension = file.mimetype.split('/')[1];
    if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
        return cb(new Error('File extension isnt valid'), false);
    }
    cb(null, true);
};

const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, `${__dirname}./../public/images/`)
    }),
    filename: ((req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    })
});

let uploadConfig = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10000000 }
}).single('image');

module.exports = {
    upload: ((req, res, next) => {
        uploadConfig(req, res, ((err) => {
            if (err) {
                return helper.setResponse(res, err.message, false);
            }
            next();
        }))
    })
};