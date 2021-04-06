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
  	.catch(() => res.status(400).json({ error: "Impossible d'enregistrer l'utiisateur dans la base de données." }));
  })
  .catch(() => res.status(500).json({ error: "Impossible de créer l'utilisteur." }));
};
exports.userLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if (!valid) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }
      res.status(200).json({
        userId: user.id,
        token: jwt.sign(
          { userId: user.id },
          process.env.SECRET,
          { expiresIn: "24h" }
        )
      });
    })
    .catch(() => res.status(500).json({ error: "Une erreur s'est produite." }));
  })
  .catch(() => res.status(401).json({ error: "Utilisateur non trouvé." }));
};
exports.userDelete = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
  .then(user => {
    user.destroy({ id: req.params.id })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(500).json({ error: "Impossible de supprimer l'utilisateur." }));
  })
  .catch(() => res.status(401).json({ error: "Utilisateur introuvable." }));
}
