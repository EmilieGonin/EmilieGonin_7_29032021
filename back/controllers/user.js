const { User, Post } = require("../middlewares/sequelize");
const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config();

exports.getUser = (req, res, next) => {
  User.findByPk(req.params.id)
  .then((user) => res.status(200).json({ user }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher l'utilisateur." }));
};
exports.userSignup = (req, res, next) => {
  const user = User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  .then((user) => res.status(201).json({
    //Return user datas and authorization token
    user: user,
    token: jwt.sign(
      { userId: user.id },
      process.env.SECRET,
      { expiresIn: "24h" }
    )
  }))
  .catch(() => res.status(400).json({ error: "Vérifiez que vos données soient exactes ou que votre adresse email ne soit pas déjà utilisée." }));
};
exports.userLogin = (req, res, next) => {
  //Search user in database with email
  User.findOne({ where: { email: req.body.email } })
  .then(user => {
    //Compare passwords
    if (!user.passwordIsValid(req.body.password)) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }
    else {
      res.status(200).json({
        //Return user datas and authorization token
        user: user,
        token: jwt.sign(
          { userId: user.id },
          process.env.SECRET,
          { expiresIn: "24h" }
        )
      });
    }
  })
  .catch(() => res.status(401).json({ error: "Utilisateur non trouvé." }));
};
exports.userUpdate = (req, res, next) => {
  //Get data from request
  const data = req.file ?
  {
    ...JSON.parse(req.body.user),
    avatar: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  } : { ...JSON.parse(req.body.user) };

  User.findByPk(req.params.id)
  .then((user) => {
    //Delete previous user avatar if necessary
    if ((req.file || data.deletefile) && user.avatar) {
      try {
        const filename = user.avatar.split("/uploads")[1];
        fs.unlinkSync(`uploads/${filename}`);
      } catch (e) {
        res.status(500).json({ error: "Impossible de supprimer l'ancien avatar." })
      }
    }
  })
  .then(() => {
    //Update user
    User.update(data, { where: { id: req.params.id } })
    .then((found) => {
      if (found != 0) {
        res.status(200).json({ message: "Utilisateur mis à jour !" });
      }
      else {
        res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur'." });
      }
    })
  })
  .catch((error) => res.status(500).json({ error: "Une erreur s'est produite pendant la mise à jour." }));
}
exports.userDelete = async (req, res, next) => {
  User.findByPk(req.params.id)
  .then((user) => {
    //Delete avatar if necessary
    if (user.avatar) {
      try {
        const filename = user.avatar.split("/uploads")[1];
        fs.unlinkSync(`uploads/${filename}`);
      } catch (e) {
        res.status(500).json({ error: "Impossible de supprimer l'ancien avatar." })
      }
    }

    //Get user posts to delete post files if necessary
    user.getPosts()
    .then((posts) => {
      for (const post of posts) {
        if (post.file) {
          const filename = post.file.split("/uploads")[1];
          try {
            fs.unlinkSync(`uploads/${filename}`);
          } catch (e) {
            res.status(500).json({ error: "Impossible de supprimer l'ancienne image." })
          }
        }
      }

      //Delete user
      User.destroy({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
      .catch((error) => res.status(500).json({ error: "Impossible de supprimer l'utilisateur." }));
    })
  })
  .catch((error) => res.status(500).json({ error: "Utilisateur non trouvé." }));
}
