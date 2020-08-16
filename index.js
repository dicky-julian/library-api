require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const db = require('./src/helpers/mysql');
const routes = require('./src/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({
//     origin: [
//         'http://localhost:3001',
//     ],
// }));
app.use(cors());
app.use('/', routes);

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Database has Connected');
});

app.listen(process.env.PORT_APP, (() => {
    console.log(`Library App runnig port ${process.env.PORT_APP}`);
}));