const { User, Post, Comment } = require("../middlewares/sequelize");
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    order: [["id", "DESC"]],
    include: [ User, Comment ] })
  .then((posts) => res.status(200).json({ posts }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher les posts." }));
};
exports.getAllPostsFromUser = (req, res, next) => {
  Post.findAll({
    where: { userId: req.params.userId },
    order: [["id", "DESC"]],
    include: [ User, Comment ] })
  .then((posts) => res.status(200).json({ posts }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher les posts." }));
};
exports.getPost = (req, res, next) => {
  Post.findByPk(req.params.id, { include: [
    User,
    { model: Comment,
      include: [ User ]
    }
  ]})
  .then((post) => res.status(200).json({ post }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher le post." }));
};
exports.newPost = (req, res, next) => {
  //Get data from request
  const data = req.file ?
  {
    ...JSON.parse(req.body.post),
    file: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  } : { ...JSON.parse(req.body.post) };

  //Get user to associate the new created post
  User.findByPk(data.userId)
  .then(user => {
    user.createPost({
      text: data.text,
      file: data.file
    })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch(() => res.status(400).json({ error: "Impossible d'enregistrer le post dans la base de données." }));
  })
  .catch(() => res.status(401).json({ error: "Utilisateur introuvable." }));
};
exports.editPost = (req, res, next) => {
  //Get data from request
  const data = req.file ?
  {
    ...JSON.parse(req.body.post),
    file: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  } : { ...JSON.parse(req.body.post) };

  Post.findByPk(req.params.id)
  .then((post) => {
    //Delete previous post file if necessary
    if ((req.file || data.deletefile) && post.file) {
      const filename = post.file.split("/uploads")[1];

      try {
        fs.unlinkSync(`uploads/${filename}`);
      } catch (e) {
        res.status(500).json({ error: "Impossible de supprimer l'ancienne image." })
      }
    }

    //Update post
    post.update(data)
    .then((found) => {
      if (found == 1) {
        res.status(200).json({ message: "Post mis à jour !" });
      }
      else {
        res.status(500).json({ error: "Impossible de mettre à jour le post." });
      }
    })
  })
  .catch((error) => res.status(500).json({ error: "Une erreur s'est produite pendant la mise à jour." }));
};
exports.deletePost = (req, res, next) => {
  Post.findByPk(req.params.id)
  .then((post) => {
    //Delete post file if necessary
    if (post.file) {
      const filename = post.file.split("/uploads")[1];
      try {
        fs.unlinkSync(`uploads/${filename}`);
      } catch (e) {
        res.status(500).json({ error: "Impossible de supprimer l'ancienne image." })
      }
    }

    //Delete post
    Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Post supprimé !" }))
    .catch((error) => res.status(500).json({ error: "Impossible de supprimer le post" }));
  })
  .catch((error) => res.status(500).json({ error: "Post non trouvé." }));
};
