const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const express = require('express');
const bodyParser = require("body-parser");
//const path = require("path");

//Create db if it doesn't already exist
const connection = mysql.createConnection({ user: "root" });
connection.query("CREATE DATABASE IF NOT EXISTS test");

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(bodyParser.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', require("./routes/user"));
app.use('/api/posts', require("./routes/posts"));

module.exports = app;
