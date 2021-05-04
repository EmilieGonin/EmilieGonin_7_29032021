const { User, Post, Comment } = require("../middlewares/sequelize");

module.exports = (req, res, next) => {
  User.findByPk(req.userId)
  .then((user) => {
    if (user.isAdmin && req.method == "DELETE") {
      next();
    }
    else {
      if (req.baseUrl == "/api/posts") {
        Post.findByPk(req.params.id)
        .then((post) => {
          if (user.hasPost(post)) {
            next()
          }
          else {
            res.status(401).json({ error: "Utilisateur invalide." });
          }
        })
      }

      else if (req.baseUrl == "/api/comment") {
        Comment.findByPk(req.params.id)
        .then((comment) => {
          if (user.hasComment(comment)) {
            next()
          }
          else {
            res.status(401).json({ error: "Utilisateur invalide." });
          }
        })
      }

      else if (req.baseUrl == "/api/user") {
        User.findByPk(req.params.id)
        .then((userToUpdate) => {
          if (user == userToUpdate) {
            next()
          }
          else {
            res.status(401).json({ error: "Utilisateur invalide." });
          }
        })
      }
    }
  })
  .catch((error) => res.status(500).json({ error: "Une erreur s'est produite." }));
};
