// articleList
const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const userDB = require("../models/user");
const articleDB = require("../models/article");

async function articleList(req, res) {
    const articles = await articleDB.getArticleList();
    res.status(200).json(articles);
}

// writeArticle
async function writeArticle(req, res) {
    const { authorId, articlePassword, title, content } = req.body;

    const postArticle = await articleDB.createArticle(authorId, {
        authorId,
        articlePassword,
        title,
        content,
    });
    // res.json({ article: postArticle });
    res.status(201).json({ result: 'success', msg: '글이 등록되었습니다.' });
}

// getArticle
async function getArticle(req, res) {
    const { articleId } = req.params; // localhost:3000/api/articles/1, 2, ... <- 여기서 req.params는 { articleId : '1' }, articleId = 1
    console.log(articleId);
    const article = await Article.findById(articleId);
    const articleAuthor = await userDB.findById(article.authorId);
    const comments = await Comment.find({ articleId: articleId }).exec();

    const commentAuthorIds = comments.map(
        (commentAuthor) => commentAuthor.authorId
    );
    const commentAuthorInfoById = await User.find({
        _id: { $in: commentAuthorIds },
    })
        .exec()
        .then((commentAuthor) =>
            commentAuthor.reduce(
                (prev, ca) => ({
                    ...prev,
                    [ca.authorId]: ca,
                }),
                {}
            )
        );

    const articleInfo = {
        articleId: article._id,
        title: article.title,
        content: article.content,
        authorId: articleAuthor.authorId,
        authorName: articleAuthor.authorName,
        createdAt: article.createdAt,
    };

    const commentsInfo = comments.map((comment) => ({
        commentId: comment.commentId,
        content: comment.commentContent,
        authorInfo: commentAuthorInfoById[comment.authorId],
        createdAt: comment.createdAt,
    }));

    res.status(200).render('read', {
        article: articleInfo,
        commentsInfo: commentsInfo,
    });
}


module.exports.articleList = articleList;
module.exports.getArticle = getArticle;
module.exports.writeArticle = writeArticle;