const mongoose = require('mongoose');
const userDB = require("./user");

const BoardSchema = mongoose.Schema(
    {
        title: String,
        content: String,
        articlePassword: String,
        authorId: String,
        authorName: String,
    },
    { timestamps: true }
);

const Article = mongoose.model('Article', BlogSchema);

BlogSchema.virtual('articleId').get(function () { return this._id.toHexString(); });
BlogSchema.set('toJSON', { virtuals: true });

async function getArticleList() {
    return Article.find().sort({ createdAt : 'desc' });
}

async function getArticleById(id) {
    return Article.findById(id);
}

async function createArticle(article) {
    const author = userDB.findById(article.authorId);

    return new Article({
        title: article.title,
        content: article.content,
        articlePassword: article.articlePassword,
        authorId: article.authorId,
        authorName: author.authorName
    }).save();
}

module.exports.getArticleList = getArticleList;
module.exports.getArticleById = getArticleById;
module.exports.createArticle = createArticle;