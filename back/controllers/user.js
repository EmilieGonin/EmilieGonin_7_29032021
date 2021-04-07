const { User } = require("../middlewares/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userSignup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = User.create({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
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
exports.userUpdate = (req, res, next) => {
  const user = req.file ?
  {
    ...JSON.parse(req.body.user),
    avatar: `${req.protocol}://${req.get('host')}/back/uploads/${req.file.filename}`
  } : { ...req.body.user };

  User.update(user, { where: { id: req.params.id } })
  .then((found) => {
    if (found[0]) {
      res.status(200).json({ message: "Utilisateur mis à jour !" });
    }
    else {
      res.status(401).json({ error: "Utilisateur non trouvé." });
    }
  })
  .catch((error) => res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur." }));
}
exports.userDelete = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
  .then((found) => {
    if (found) {
      res.status(200).json({ message: "Utilisateur supprimé !" });
    }
    else {
      res.status(401).json({ error: "Utilisateur non trouvé." });
    }
  })
  .catch((error) => res.status(500).json({ error: "Impossible de supprimer l'utilisateur." }));
}
