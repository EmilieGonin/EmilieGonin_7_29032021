const { User, Post, Comment } = require("../middlewares/sequelize");

exports.newComment = (req, res, next) => {
  Post.findByPk(req.body.postId)
  .then(post => {
    post.createComment({
      text: req.body.text
    })
    .then((comment) => comment.setUser(post.UserId))
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch(() => res.status(400).json({ error: "Impossible d'enregistrer le commentaire dans la base de données." }));
  })
  .catch(() => res.status(401).json({ error: "Post introuvable." }));
};
exports.editComment = (req, res, next) => {
  //
};
exports.deleteComment = (req, res, next) => {
  //
};
