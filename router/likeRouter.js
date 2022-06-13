const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const likeController = require("../controller/likeController");
const router = express.Router();


router.post('/:contentId',authMiddleware , likeController.like);


router.get('/', likeController.totalLike);


router.delete('/:contentId/:likeId', authMiddleware, likeController.deletelike);


module.exports = router;

