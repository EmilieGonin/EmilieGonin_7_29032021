const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
const express = require('express');
const bodyParser = require("body-parser");
//const path = require("path");

const app = express();

//Import routes
const authRoutes = require("./routes/auth");

//Create db if it doesn't already exist
const connection = mysql.createConnection({ user: "root" });
connection.query("CREATE DATABASE IF NOT EXISTS test");

//Connect to db
const sequelize = new Sequelize("test", "root", null, { dialect: "mysql" });
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) => console.error('Unable to connect to the database:', error));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(bodyParser.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);

module.exports = app;
