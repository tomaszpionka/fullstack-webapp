const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});


db.getConnection((err, con)=>{
    if (err) {
        console.log(`Could not establish connection: ${err}`);
    } else {
        console.log(`Connected to the database: ${process.env.MYSQL_DATABASE}`);
    }
});

module.exports = db;