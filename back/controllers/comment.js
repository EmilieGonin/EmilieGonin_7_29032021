const { Post, Comment } = require("../middlewares/sequelize");

exports.newComment = (req, res, next) => {
  Post.findByPk(req.body.postId)
  .then(post => {
    post.createComment({
      text: req.body.text
    })
    .then((comment) => comment.setUser(req.body.userId))
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch(() => res.status(400).json({ error: "Impossible d'enregistrer le commentaire dans la base de données." }));
  })
  .catch(() => res.status(401).json({ error: "Post introuvable." }));
};
exports.editComment = (req, res, next) => {
  Comment.update({ text: req.body.text }, { where: { id: req.params.id } })
  .then((found) => {
    if (found != 0) {
      res.status(200).json({ message: "Commentaire mis à jour !" });
    }
    else {
      res.status(404).json({ error: "Commentaire non trouvé." });
    }
  })
  .catch((error) => res.status(500).json({ error: "Impossible de mettre à jour le commentaire." }));
};
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
  .then((found) => {
    if (found) {
      res.status(200).json({ message: "Commentaire supprimé !" });
    }
    else {
      res.status(401).json({ error: "Commentaire non trouvé." });
    }
  })
  .catch((error) => res.status(500).json({ error: "Impossible de supprimer le commentaire." }));
};
