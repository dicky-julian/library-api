### Library API
RestFul API for Library app, created by Express & SQL

#### dependencies
- express `npm i express`
- mysql `npm i mysql`
- body-parser `npm i body-parser`
- multer `npm i multer` (for parsing multipart/form data)
- dotenv `npm i dotenv`
- nodemon `npm i nodemon -g`

#### serve app
- run `npm install`
- set up your mysql database (import db_possapp.sql to your db management (xampp)) and create env data for require config (ongoing)
- create dotenv file in main directory according to your needs(`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `PORT_APP`)
- run `npm start`
- open your local server `default - localhost:3000`