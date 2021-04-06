const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

const db = {};

//Create db if it doesn't already exist
const connection = mysql.createConnection({ user: "root" });
connection.query("CREATE DATABASE IF NOT EXISTS test");

//Connect to db
db.sequelize = new Sequelize("test", "root", null, { dialect: "mysql" });

//Add models
db.User = require("../models/User")(db.sequelize, Sequelize);

module.exports = db;
