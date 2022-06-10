const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const userDB = require("../models/user");
const articleDB = require("../models/article");

// *** 댓글 작성 API
router.post('/comments/write', authMiddleware, async (req, res) => {
    const { authorId, articleId, commentContent } = req.body;
    // console.log(req.body);

    const postArticle = await Comment.create({
        authorId,
        articleId,
        commentContent,
    });
    // res.json({ article: postArticle });
    res.status(201).json({ result: 'success', msg: '댓글이 등록되었습니다.' });
});


// *** 댓글 수정 API
router.patch('/comments/:commentId/modify', authMiddleware, async (req, res) => {
        const { commentId, articleId, modifiedCommentContent } = req.body;
        const comment = await Comment.findById(commentId);
        if (comment) {
            const modifiedComment = await Comment.findByIdAndUpdate(commentId, {
                $set: { commentContent: modifiedCommentContent },
            });
            res.status(201).json({
                result: 'success',
                msg: '댓글이 수정되었습니다.',
            });
        } else {
            res.status(400).json({
                result: 'error',
                msg: '댓글 수정에 실패했습니다..',
            });
        }
    }
);


// *** 댓글 삭제 API
router.delete('/comments/:commentId/delete', authMiddleware, async (req, res) => {
        const { commentId } = req.body;
        const existsComment = await Comment.findById(commentId);
        console.log(commentId);
        if (existsComment) {
            await Comment.findByIdAndDelete(commentId); // commentId 일치하는 것으로 삭제
            res.status(200).json({
                result: 'success',
                msg: '코멘트가 삭제되었습니다.',
            });
        } else {
            // 올 일은 없지만, id값으로 찾아진게 없다는 것은 멀티 세션으로 같은 글을 동시에 지우려고 했을때?
            res.status(400).json({
                result: 'error',
                msg: '해당 코멘트는 이미 삭제되었습니다.',
            });
        }
    }
);