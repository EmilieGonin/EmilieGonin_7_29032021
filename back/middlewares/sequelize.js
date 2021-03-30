const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

//Create db if it doesn't already exist
const connection = mysql.createConnection({ user: "root" });
connection.query("CREATE DATABASE IF NOT EXISTS test");

//Connect to db
const sequelize = new Sequelize("test", "root", null, { dialect: "mysql" });

sequelize.authenticate()
.then(() => console.log("Connexion à la base de données MySQL terminée !"))
.catch((error) => console.error("Impossible de se connecter à la base de données :", error));

//Add models
const UserModel = require("../models/User");
const User = UserModel(sequelize, Sequelize);

sequelize.sync()
.then(() => console.log("Base de données synchronisée avec succès !"))
.catch((error) => console.error(error));

module.exports = { User };
