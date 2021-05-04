const express = require('express');
const router = express.Router();
const authentication = require("../middlewares/authentication");
const multer = require("../middlewares/multer");
const controller = require("../controllers/posts");

router.get("/", authentication, controller.getAllPosts);
router.get("/user/:userId", authentication, controller.getAllPostsFromUser);
router.get("/:id", authentication, controller.getPost);
router.post("/", authentication, multer, controller.newPost);
router.put("/:id", authentication, multer, controller.editPost);
router.delete("/:id", authentication, controller.deletePost);

module.exports = router;
