## Library API
RestFul API for Library app, created by Express & SQL

### Usage
#### dependencies
express `npm i express`
mysql `npm i mysql`
cors `npm i cors`
body-parser `npm i body-parser`
multer `npm i multer` (for parsing multipart/form data)
dotenv `npm i dotenv`
nodemon `npm i nodemon -g`

#### serve app
run `npm install`
set up your mysql database (import db_possapp.sql to your db management (xampp)) and create env data for require config (ongoing)
create dotenv file in main directory according to your needs(`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `PORT_APP`)
run `npm start`
open your local server `default - localhost:3000`

### API Reference

#### Book
Book object with all its details.

**Endpoint Path**: `/book`

| **Request**   | **Method**    | **Parameter**     | **Description**   |
| ------------- | ------------- | ----------------- | ----------------- |
| `/`           | GET           | `title(string)`, `status(integer : 0 or 1)` | Get Book's resource object. |
| `/{id}`       | GET           | N/A               | Get Book's resource object by id. |
| `/`           | POST          | N/A               | Post Book's resource object. **require input :** title, description, image(file), id_genre, id_author |
| `/{id}`       | PUT           | N/A               | Update Book's data by Id |
| `/{id}`       | DELETE        | N/A               | Delete Book's data by Id |