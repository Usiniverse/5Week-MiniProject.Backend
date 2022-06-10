const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        commentId: String,
        userId: String,
        comment: String,
    },
    { timestamps: true }
);

CommentSchema.virtual('commentId').get(function () {
    return this._id.toHexString();
});
CommentSchema.set('toJSON', {
    virtuals: true,
});

async function existedComment(commentId) {
    comment = await Comment.findById(commentId);
}


module.exports = mongoose.model('Comment', CommentSchema);
