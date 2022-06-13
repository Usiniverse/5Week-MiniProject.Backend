const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const commentController = require("../controller/commentController");



//post
router.post("/:contentId", authMiddleware, commentController.postcom);

// get
router.get("/:contentId", commentController.getcom);

// patch
router.patch("/:contentId/:commentId", authMiddleware, commentController.patchcom);

// delete
router.delete("/:contentId/:commentId", authMiddleware, commentController.delcom);
module.exports = router;