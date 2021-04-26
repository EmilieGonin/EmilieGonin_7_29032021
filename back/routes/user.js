const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
const controller = require("../controllers/user");

router.get("/:id", auth, controller.getUser);
router.post("/signup", controller.userSignup);
router.post("/login", controller.userLogin);
router.put("/:id", auth, multer, controller.userUpdate);
router.delete("/:id", auth, controller.userDelete);

module.exports = router;
