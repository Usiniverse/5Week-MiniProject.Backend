const Comment = require("../models/comment");

async function postcom(req, res) {
    const { nickname } = res.locals.user;
    const { comment } = req.body;
    const { contentId } = req.params;
    const contentcomment = await Comment.create({
        comment,
        nickname,
        contentId
    });
    console.log(contentcomment);
    res.status(201).json({ contentcomment, msg: "댓글이 등록되었습니다." });
};


async function getcom (req, res)  {
    const comment = await Comment.find({contentId,})
        .sort("-updateAt")
    
    res.status(201).json({
        comment,
    });

};

async function patchcom (req, res)  {
    const { commentId } = req.params;
    const { fixedCommentContent } = req.body;

    // function timesetkr() {
    //     const gettime = new Date(); 
    //     const utcNow =
    //     gettime.getTime() + gettime.getTimezoneOffset() * 60 * 1000;
    //     const koreaTimeDiff = 9 * 60 * 60 * 1000;
    //     const krtime = new Date(utcNow + koreaTimeDiff);
    // }
    // timesetkr();
    // if (krtime !== comment.updateAt) {
    //     await Comment.findByIdAndUpdate(updateAt, { krtime });
    // }

    if (commentId) {
    const fixedComment = await Comment.findByIdAndUpdate(commentId, {
        $set: { comment: fixedCommentContent },
    });
    res.status(201).json({
        fixedComment,
        msg: "댓글이 수정되었습니다.",
    });
    } else {
    res.status(400).json({
        msg: "댓글 수정에 실패했습니다.",
        });
    };
};

// *** 댓글 삭제 API
async function delcom (req, res) {
const { commentId } = req.params;

if (Comment) {
    await Comment.findByIdAndDelete(commentId); // commentId 일치하는 것으로 삭제
    res.status(200).json({
        result: "success",
        msg: "코멘트가 삭제되었습니다.",
    });
} else {
    res.status(400).json({
        result: "error",
        msg: "코멘트가 정상적으로 삭제되지 않았습니다.",
        });
    }
};


module.exports.postcom = postcom;
//module.exports.commentList = commentList;
module.exports.patchcom = patchcom;
//module.exports.getpatchedcom = getpatchedcom;
module.exports.delcom = delcom;
module.exports.getcom = getcom;
