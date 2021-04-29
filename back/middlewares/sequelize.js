const { Sequelize } = require("sequelize");

module.exports = db = {};

//Connect to db
sequelize = new Sequelize("test", "root", null, {
  dialect: "mysql",
  logging: false
});

//Add models
db.User = require("../models/User")(sequelize, Sequelize);
db.Post = require("../models/Post")(sequelize, Sequelize);
db.Comment = require("../models/Comment")(sequelize, Sequelize);

db.User.hasMany(db.Comment, { onDelete: "CASCADE" });
db.Comment.belongsTo(db.User);

db.User.hasMany(db.Post, { onDelete: "CASCADE" });
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Comment, { onDelete: "CASCADE" });
db.Comment.belongsTo(db.Post);

sequelize.authenticate()
.then(() => console.log("Connexion à la base de données MySQL terminée !"))
.catch((error) => console.error("Impossible de se connecter à la base de données :", error));

sequelize.sync({ force: true })
.then(() => console.log("Base de données synchronisée avec succès !"))
.catch((error) => console.error(error));
