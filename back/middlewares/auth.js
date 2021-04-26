const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw "Authentification requise.";
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.userId;

    if (req.body.UserId && req.body.UserId !== userId) {
      throw "Utilisateur invalide.";
    }
    else {
      next();
    }
  }
  catch(e) {
    res.status(401).json({ error: e });
  }
};
