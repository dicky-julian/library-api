require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./src/helpers/mysql');
const routes = require('./src/routes');

const allowedOrigins = [
    'https://kawan-kkn.web.app'
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(cors({
    origin: ((origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site doesnt allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }),
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
}));

db.connect((err) => {
    if (err) return err;
    console.log('Database has Connected');
});

app.listen(process.env.PORT_APP, (() => {
    console.log(`Library App runnig port ${process.env.PORT_APP}`);
}));