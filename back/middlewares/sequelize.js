const { Sequelize } = require("sequelize");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = db = {};

//Create database if it doesn't already exist
const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
});
connection.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME);

//Connect to database
sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false
});

//Add models
db.User = require("../models/User")(sequelize, Sequelize);
db.Post = require("../models/Post")(sequelize, Sequelize);
db.Comment = require("../models/Comment")(sequelize, Sequelize);

//Associate models
db.User.hasMany(db.Comment, { onDelete: "CASCADE" });
db.Comment.belongsTo(db.User);

db.User.hasMany(db.Post, { onDelete: "CASCADE" });
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Comment, { onDelete: "CASCADE" });
db.Comment.belongsTo(db.Post);

//Hash and compare every password before User signup and login
db.User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
})
db.User.prototype.passwordIsValid = function(password) {
  return bcrypt.compareSync(password, this.password);
}

sequelize.authenticate()
.then(() => console.log("Connexion à la base de données MySQL terminée !"))
.catch((error) => console.error("Impossible de se connecter à la base de données :", error));

sequelize.sync({ force: true /*Only for development*/ })
.then(() => {
  console.log("Base de données synchronisée avec succès !");

  //Create admin user
  db.User.findOrCreate({
    where: {
      email: "admin@email.com"
    },
    defaults: {
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@email.com",
    password: process.env.ADMIN_PASSWORD,
    isAdmin: true
  }})
})
.catch((error) => console.error(error));
