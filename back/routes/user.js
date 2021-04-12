const express = require('express');
const router = express.Router();
const multer = require("../middlewares/multer");
const controller = require("../controllers/user");

router.get("/:id", controller.getUser);
router.post("/signup", controller.userSignup);
router.post("/login", controller.userLogin);
router.put("/:id", multer, controller.userUpdate);
router.delete("/:id", controller.userDelete);

module.exports = router;
