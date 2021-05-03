const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
const controller = require("../controllers/posts");

router.get("/", auth, controller.getAllPosts);
router.get("/user/:userId", auth, controller.getAllPostsFromUser);
router.get("/:id", auth, controller.getPost);
router.post("/", auth, multer, controller.newPost);
router.put("/:id", auth, multer, controller.editPost);
router.delete("/:id", auth, controller.deletePost);

module.exports = router;
