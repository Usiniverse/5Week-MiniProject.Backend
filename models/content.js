const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema(
    {
        email : String,
        nickname: String,
        title : String,
        content: String,
        imageURL : [String],
        createAt : String,
        updateAt : String
    },
);

// const Content = mongoose.model('Content', ContentSchema);

ContentSchema.virtual('contentId').get(function () { 
    return this._id.toHexString(); 
});

ContentSchema.set('toJSON', { virtuals: true });

async function getContentList() {
    return Content.find().sort({ createdAt : 'desc' });
}

const Content = mongoose.model('Content', ContentSchema);
module.exports = Content;

module.exports.getContentList = getContentList;
