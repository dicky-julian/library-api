## Library API
RestFul API for Library app, created by Express & SQL

### Usage
> **dependencies**  
- express `npm i express`  
- mysql `npm i mysql`  
- cors `npm i cors`  
- body-parser `npm i body-parser`  
- multer `npm i multer` (for parsing multipart/form data)  
- dotenv `npm i dotenv`  
- nodemon `npm i nodemon -g`  

> **serve app**  
1. run `npm install`  
2. set up your mysql database (import db_possapp.sql to your db management (xampp)) and create env data for require config (ongoing)  
3. create dotenv file in main directory according to your needs(`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `PORT_APP`)  
4. run `npm start`  
5. open your local server `default - localhost:3000`  

### API Reference

> **Book** 

Book object with all its details  
**Endpoint Path**: `/book`

| **Request**   | **Method**    | **Parameter**     | **Description**   |
| ------------- | ------------- | ----------------- | ----------------- |
| `/`           | GET           | `title(string)`, `status(integer : 0 or 1)`, `page(integer)`, `order(string)` | Get Book's resource object. |
| `/{id}`       | GET           | N/A               | Get Book's resource object by id. |
| `/`           | POST          | N/A               | Post Book's resource object.  **require input :** title, description, image(file), id_genre, id_author |
| `/{id}`       | PUT           | N/A               | Update Book's data by Id |
| `/{id}`       | DELETE        | N/A               | Delete Book's data by Id |

**Examples Request :**  
- `/book?title=John&status=1` // Returns a list of book where column `title like John` or column `status = 1`
- `/book?page=1&order=title` // Returns a page of list with 10 list perpage and order these by title
- `/book/1` // Returns a list of book with id **1**

> **Author** 

Author object with all its details  
**Endpoint Path**: `/author`

| **Request**   | **Method**    | **Parameter**     | **Description**   |
| ------------- | ------------- | ----------------- | ----------------- |
| `/`           | GET           | `name(string)`, `page(integer)`, `order(string)` | Get Author's resource object. |
| `/{id}`       | GET           | N/A               | Get Author's resource object by id. |
| `/`           | POST          | N/A               | Post Author's resource object.  **require input :** name |
| `/{id}`       | PUT           | N/A               | Update Author's data by Id |
| `/{id}`       | DELETE        | N/A               | Delete Author's data by Id |

**Examples Request :**  
- `/author?name=John` // Returns a list of author where column `name like John`
- `/author?page=1&order=name` // Returns a page of list with 10 list perpage and order these by name
- `/author/1` // Returns a list of author with id **1**

> **Genre** 

Genre object with all its details  
**Endpoint Path**: `/genre`

| **Request**   | **Method**    | **Parameter**     | **Description**   |
| ------------- | ------------- | ----------------- | ----------------- |
| `/`           | GET           | `name(string)`, `page(integer)`, `order(string)` | Get Genre's resource object. |
| `/{id}`       | GET           | N/A               | Get Genre's resource object by id. |
| `/`           | POST          | N/A               | Post Genre's resource object.  **require input :** name |
| `/{id}`       | PUT           | N/A               | Update Genre's data by Id |
| `/{id}`       | DELETE        | N/A               | Delete Genre's data by Id |

**Examples Request :**  
- `/genre?name=Myths` // Returns a list of genre where column `name like Myths`
- `/genre?page=1&order=name` // Returns a page of list with 10 list perpage and order these by name
- `/genre/1` // Returns a list of genre with id **1**