require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./src/helpers/mysql');
const routes = require('./src/routes');

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(cors());

db.connect((err) => {
    if (err) return err;
    console.log('Database has Connected');
});

app.listen(process.env.PORT_APP, (() => {
    console.log(`Library App runnig port ${process.env.PORT_APP}`);
}));