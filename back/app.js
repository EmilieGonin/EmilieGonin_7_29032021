const express = require('express');
const bodyParser = require("body-parser");
//const path = require("path");
const { sequelize } = require("./middlewares/sequelize");

sequelize.authenticate()
.then(() => console.log("Connexion à la base de données MySQL terminée !"))
.catch((error) => console.error("Impossible de se connecter à la base de données :", error));

sequelize.sync()
.then(() => console.log("Base de données synchronisée avec succès !"))
.catch((error) => console.error(error));

const app = express();

//Import routes
const authRoutes = require("./routes/auth");

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
