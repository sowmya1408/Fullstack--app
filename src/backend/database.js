const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config(); 

const { MYSQL_URL } = process.env;
const connection = mysql.createPool(MYSQL_URL);


module.exports = connection;
