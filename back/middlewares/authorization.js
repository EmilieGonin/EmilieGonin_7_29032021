const { User, Post, Comment } = require("../middlewares/sequelize");

module.exports = (req, res, next) => {
  User.findByPk(req.userId)
  .then((user) => {
    //If user is admin, accept all DELETE requests
    if (user.isAdmin && req.method == "DELETE") {
      next();
    }
    else {
      if (req.baseUrl == "/api/posts") {
        //Check if user is the post owner
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
        //Check if user is the comment owner
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
        //Check if user is updating its own account
        User.findByPk(req.params.id)
        .then((userToUpdate) => {
          if (user.id == userToUpdate.id) {
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
