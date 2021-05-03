const { User, Post, Comment } = require("../middlewares/sequelize");

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
    include: User, Comment })
  .then((posts) => res.status(200).json({ posts }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher les posts." }));
};
exports.getPost = (req, res, next) => {
  Post.findByPk(req.params.id, { include: [ User, Comment ] })
  .then((post) => res.status(200).json({ post }))
  .catch((error) => res.status(500).json({ error: "Impossible d'afficher le post." }));
};
exports.newPost = (req, res, next) => {
  const data = req.file ?
  {
    ...JSON.parse(req.body.post),
    file: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  } : { ...JSON.parse(req.body.post) };

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
  Post.update({ text: req.body.text }, { where: { id: req.params.id } })
  .then((found) => {
    if (found[0]) {
      res.status(200).json({ message: "Post mis à jour !" });
    }
    else {
      res.status(404).json({ error: "Post non trouvé." });
    }
  })
  .catch((error) => res.status(500).json({ error: "Impossible de mettre à jour le post." }));
};
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id } })
  .then((found) => {
    if (found) {
      res.status(200).json({ message: "Post supprimé !" });
    }
    else {
      res.status(401).json({ error: "Post non trouvé." });
    }
  })
  .catch((error) => res.status(500).json({ error: "Impossible de supprimer le post." }));
};
