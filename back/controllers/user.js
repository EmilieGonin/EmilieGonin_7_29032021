const { User } = require("../middlewares/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config();

exports.getUser = (req, res, next) => {
  User.findByPk(req.params.id)
  .then((user) => res.status(200).json({ user }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher l'utilisateur." }));
};
exports.userSignup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = User.create({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    .then((user) => res.status(201).json({
      user: user,
      token: jwt.sign(
        { userId: user.id },
        process.env.SECRET,
        { expiresIn: "24h" }
      )
    }))
  	.catch(() => res.status(400).json({ error: "Vérifiez que vos données soient exactes ou que votre adresse email ne soit pas déjà utilisée." }));
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
        user: user,
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
  const data = req.file ?
  {
    ...JSON.parse(req.body.user),
    avatar: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  } : { ...JSON.parse(req.body.user) };

  User.findByPk(req.params.id)
  .then((user) => {
    if ((req.file || data.deletefile) && user.avatar) {
      const filename = user.avatar.split("/uploads")[1];

      try {
        fs.unlinkSync(`uploads/${filename}`);
      } catch (e) {
        res.status(500).json({ error: "Impossible de supprimer l'ancien avatar." })
      }
    }
  })
  .then(() => {
    User.update(data, { where: { id: req.params.id } })
    .then((found) => {
      if (found == 1) {
        res.status(200).json({ message: "Utilisateur mis à jour !" });
      }
      else {
        res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur'." });
      }
    })
  })
  .catch((error) => res.status(500).json({ error: "Une erreur s'est produite pendant la mise à jour." }));
}
exports.userDelete = (req, res, next) => {
  User.findByPk(req.params.id)
  .then((user) => {
    if (user.avatar) {
      const filename = user.avatar.split("/uploads")[1];
      fs.unlink(`uploads/${filename}`, (error) => {
        if (error) {
          throw error;
        }
      })
    }

    user.destroy()
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(500).json({ error: "Impossible de supprimer l'utilisateur." }));
  })
  .catch((error) => res.status(500).json({ error: "Utilisateur non trouvé." }));
}
