const express = require('express');
const router = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const multer = require("../middlewares/multer");
const controller = require("../controllers/user");

router.get("/:id", authentication, controller.getUser);
router.post("/signup", controller.userSignup);
router.post("/login", controller.userLogin);
router.put("/:id", authentication, authorization, multer, controller.userUpdate);
router.delete("/:id", authentication, authorization, controller.userDelete);

module.exports = router;
