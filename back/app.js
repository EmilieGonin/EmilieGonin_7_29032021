const express = require('express');
const bodyParser = require("body-parser");
//const path = require("path");
require("./middlewares/sequelize");

const app = express();

//Import routes
const userRoutes = require("./routes/user");

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(bodyParser.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);

module.exports = app;
