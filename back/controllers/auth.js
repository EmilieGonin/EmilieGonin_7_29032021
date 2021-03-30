const { Sequelize } = require("sequelize");
const { User } = require("../middlewares/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userSignup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = User.build({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    user.save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
  	.catch((error) => res.status(400).json({ error: "Impossible d'enregistrer l'utiisateur dans la base de données." }));
  })
  .catch((error) => res.status(500).json({ error: "Impossible de créer l'utilisteur." }));
};
exports.userLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé." });
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }
      res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user._id },
          process.env.SECRET,
          { expiresIn: "24h" }
        )
      });
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};
