const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.delete("/delete", authController.userDelete);

module.exports = router;
