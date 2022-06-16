const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    updateAt: {
        type : Date,
        default : Date.now
    },
    contentId: {
      type: String,
      required: true,
    },
    createAt : String,
    updateAt : String
  }
  /*{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }*/
);

CommentSchema.virtual('commentId').get(function () {
    return this._id.toHexString();
});
CommentSchema.set('toJSON', {
    virtuals: true,
});




module.exports = mongoose.model('Comment', CommentSchema);
