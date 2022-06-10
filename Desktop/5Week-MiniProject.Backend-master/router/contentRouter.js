const express = require("express");
const Content = require("../models/content");
const ContentController = require("../controller/contentController")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware");
const userController = require("../controller/userContoller");
const router = express.Router();


// 게시글 작성 API
router.post('/', authMiddleware, ContentController.writeContent);


// 게시글 조회 API
router.get('/', ContentController.ContentList);


// 게시글 상세 조회 API
// router.get('/:contentId', authMiddleware, ContentController.getContent);


// **********************************************************************
// 게시글 수정 API(get) 수정 API에 url 겹칠듯!!!
// router.get('/:contentId', ContentController.getModifyContent);


// 게시글 수정 API(put)
router.put('/:contentId', authMiddleware, ContentController.modifyContent);


// ******************************************************************
// 게시글 삭제 API(email, articleId 같이 맞으면 삭제)
router.delete('/:contentId', authMiddleware, ContentController.deleteContent);

module.exports = router;