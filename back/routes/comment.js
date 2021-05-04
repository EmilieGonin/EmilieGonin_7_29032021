const express = require('express');
const router = express.Router();
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const controller = require("../controllers/comment");

router.post("/", authentication, controller.newComment);
router.put("/:id", authentication, authorization, controller.editComment);
router.delete("/:id", authentication, authorization, controller.deleteComment);

module.exports = router;
