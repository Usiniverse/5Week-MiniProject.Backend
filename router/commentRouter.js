const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const commentController = require("../controller/commentController");



//post
router.post("/", authMiddleware, commentController.postcom);

// get
router.get("/", commentController.getcom);

// patch
router.patch("/", authMiddleware, commentController.patchcom);

// delete
router.delete("/", authMiddleware, commentController.delcom);
module.exports = router;
