const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};
initialize();

async function initialize() {
  //Create db if it doesn't already exist
  const connection = await mysql.createConnection({ user: "root" });
  await connection.query("CREATE DATABASE IF NOT EXISTS test");

  //Connect to db
  db.sequelize = new Sequelize("test", "root", null, {
    dialect: "mysql",
    logging: false
  });

  //Add models
  db.User = require("../models/User")(db.sequelize, Sequelize);
  db.Post = require("../models/Post")(db.sequelize, Sequelize);
  db.Comment = require("../models/Comment")(db.sequelize, Sequelize);

  db.User.hasMany(db.Comment, { foreignKey: { allowNull: false } });
  db.Comment.belongsTo(db.User);

  db.User.hasMany(db.Post, { foreignKey: { allowNull: false } });
  db.Post.belongsTo(db.User);

  db.Post.hasMany(db.Comment, { foreignKey: { allowNull: false } });
  db.Comment.belongsTo(db.Post);

  await db.sequelize.authenticate()
  .then(() => console.log("Connexion à la base de données MySQL terminée !"))
  .catch((error) => console.error("Impossible de se connecter à la base de données :", error));

  await db.sequelize.sync({ force: true })
  .then(() => console.log("Base de données synchronisée avec succès !"))
  .catch((error) => console.error(error));
}
