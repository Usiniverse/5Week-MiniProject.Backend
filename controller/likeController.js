const Like = require("../models/like");

//좋아요 기능
async function like(req, res) {
  const { nickname } = res.locals.user;
  const { contentId } = req.params;

  const findLike = await Like.findOne({ contentId, nickname });
    for(let i=0; i<findLike.length; i++){
        if(contentId === findLike[i].contentId && nickname === findLike[i].nickname){
            return res.status(400).send({errorMessage: "이미 좋아요를 하셨습니다!"})
        }}
 
    
        const like = await Like.create({
            nickname,
            contentId,
          });
    
          return res.status(201).json({ like, msg: "좋아요 완료!" });
   }

//좋아요 조회
async function totalLike(req, res) {
  const findAllLike = await Like.find();
  res.status(200).json(findAllLike);
}

//좋아요 취소
async function deletelike(req, res) {
  const { nickname } = res.locals.user;
  const { contentId } = req.params;

  const findLike = await Like.findOne({ contentId, nickname });

  if (!findLike) {
    return res.status(400).send({ errorMessage: "좋아요를 하지 않았습니다." });
  }

  const unLike = await Like.deleteOne(findLike);
  res.status(200).json({ unLike, msg: "좋아요 취소 완료!" });
}

module.exports.like = like;
module.exports.totalLike = totalLike;
module.exports.deletelike = deletelike;
