const { Likes, Posts } = require("../models");

class LikesRepository {
  async findLikeByUserIdAndPostId(userId, postId) {
    return await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });
  }

  async createLike(userId, userInfoId, postId) {
    return await Likes.create({
      UserId: userId,
      UserInfoId: userInfoId,
      PostId: postId,
    });
  }

  async incrementLikeCount(postId) {
    return await Posts.increment("likeCount", { where: { postId: postId } });
  }

  async findAllLike() {
    return await Posts.findAll();
  }
}

module.exports = LikesRepository;
