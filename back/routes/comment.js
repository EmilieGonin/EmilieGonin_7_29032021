const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const controller = require("../controllers/comment");

router.post("/", auth, controller.newComment);
router.put("/:id", auth, controller.editComment);
router.delete("/:id", auth, controller.deleteComment);

module.exports = router;
