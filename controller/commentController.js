const Comment = require("../models/comment");

async function postcom(req, res) {
    const { nickname } = res.locals.user;
    const { comment } = req.body;
    const { contentId } = req.params;
    
    const nDate = moment().format('YYYY-MM-DD HH:mm:ss');
    
    const contentcomment = await Comment.create({
        comment,
        nickname,
        contentId,
        nDate,
    });
    
    res.status(201).json({ contentcomment, msg: "댓글이 등록되었습니다." });
};


async function getcom (req, res)  {
    const { contentId } = req.params;
    const comment = await Comment.find({contentId}).sort("-updateAt")
    res.status(201).json({comment});
};

//댓글 수정
async function patchcom(req, res) {
  const { nickname } = res.locals.user;
  const { commentId } = req.params;
  const { comment } = req.body;
  const findComment = await Comment.findById(commentId);
    
  const nDate = moment().format('YYYY-MM-DD HH:mm:ss');

  try {
    if (findComment === null || nickname !== findComment.nickname) {
      return res.status(400).json({ errorMessage: "접근 권한이 없습니다!" });
    }

    const fixedComment = await Comment.findByIdAndUpdate(commentId, {
      $set: { comment: comment },
    });
     res.status(201).json({ fixedComment, nDate, msg: "댓글이 수정되었습니다." });

  } catch (err) {
    res.status(400).json({ errorMessage: "댓글 수정에 실패하였습니다." });
  }
}

// *** 댓글 삭제 API
async function delcom(req, res) {
  const { nickname } = res.locals.user;
  const { commentId } = req.params;
  const findComment = await Comment.findById(commentId);

  if (findComment === null) {
    return res.status(400).json({ errorMessage: "접근 권한이 없습니다!" });
  }

  if (findComment !== null && nickname === findComment.nickname) {
    await Comment.findByIdAndDelete(commentId); // commentId 일치하는 것으로 삭제
    res.status(200).json({
      result: "success",
      msg: "코멘트가 삭제되었습니다.",
    });
  }
};


module.exports.postcom = postcom;
//module.exports.commentList = commentList;
module.exports.patchcom = patchcom;
//module.exports.getpatchedcom = getpatchedcom;
module.exports.delcom = delcom;
module.exports.getcom = getcom;
