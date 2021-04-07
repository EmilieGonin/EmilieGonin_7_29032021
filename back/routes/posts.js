const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts");

router.get("/", controller.getAllPosts);
router.get("/user/:userId", controller.getAllPostsFromUser);
router.get("/:id", controller.getPost);
router.post("/", controller.newPost);
router.put("/:id", controller.editPost);
router.delete("/:id", controller.deletePost);

module.exports = router;
