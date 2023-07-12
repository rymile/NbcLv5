const LikeService = require("../services/likes.service");

class LikesController {
  likeService = new LikeService();

  createLike = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId, userInfoId } = req.body;

      await this.likeService.createLike(userId, userInfoId, postId);

      return res.status(200).json({ message: "좋아요가 추가되었습니다." });
    } catch (error) {
      console.error("에러 발생", error);
      return res
        .status(401)
        .json({ message: "서버 에러로 인해 좋아요를 추가할 수 없습니다." });
    }
  };

  getLike = async (req, res, next) => {
    const likedpost = await this.likeService.findAllLike();
    res.status(200).json({ data: likedpost });
  };
}

module.exports = LikesController;
