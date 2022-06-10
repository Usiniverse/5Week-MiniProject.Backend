const express = require("express");
const Article = require("../models/content");
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth-middleware");
const Comment = require("../models/comment");
const articleContoller = require("../controller/contentController")

const router = express.Router();

// 게시물 목록 API
router.get("/", articleContoller.articleList);

// 게시물 쓰기 API
router.post('/', authMiddleware, articleContoller.writeArticle);

// 게시물 상세 조회
router.get('/:articleId', articleContoller.getArticle);

module.exports = router;



// 글쓰기 접근 시 사용자 정보를 가져가기 위한 메소드. write.ejs > getAuthorInfo()
// router.get('/articles/write', authMiddleware, async (req, res) => {
//     const { authorId } = res.locals.user;
//     const authorInfo = await User.findById(authorId);
//     res.status(200).send({
//         author: {
//             authorId: authorId,
//             authorName: authorInfo.authorName,
//         },
//     });
// });