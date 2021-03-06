const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', require("./routes/user"));
app.use('/api/posts', require("./routes/posts"));
app.use('/api/comment', require("./routes/comment"));

module.exports = app;
