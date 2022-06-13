const express = require("express");
const ContentController = require("../controller/contentController")
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();


// 게시글 작성 API
router.post('/', authMiddleware, ContentController.writeContent);


// 게시글 조회 API
router.get('/', ContentController.ContentList);


// 게시글 수정 API(put)
router.patch('/:contentId', authMiddleware, ContentController.modifyContent);


// ******************************************************************
// 게시글 삭제 API(email, articleId 같이 맞으면 삭제)
router.delete('/:contentId', authMiddleware, ContentController.deleteContent);

module.exports = router;