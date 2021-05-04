const express = require('express');
const router = express.Router();
const authentication = require("../middlewares/authentication");
const controller = require("../controllers/comment");

router.post("/", authentication, controller.newComment);
router.put("/:id", authentication, controller.editComment);
router.delete("/:id", authentication, controller.deleteComment);

module.exports = router;
