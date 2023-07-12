const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  likeRepository = new LikeRepository();

  createLike = async (userId, userInfoId, postId) => {
    const existLike = await this.likeRepository.findLikeByUserIdAndPostId(
      userId,
      postId
    );

    if (existLike) {
      throw new Error("이미 좋아요한 게시물입니다.");
    }

    await this.likeRepository.createLike(userId, userInfoId, postId);
    await this.likeRepository.incrementLikeCount(postId);
  };

  // async createLike(userId, userInfoId, postId) {
  //   const existLike = await this.likeRepository.findLikeByUserIdAndPostId(
  //     userId,
  //     postId
  //   );

  //   if (existLike) {
  //     throw new Error("이미 좋아요한 게시물입니다.");
  //   }

  //   await this.likeRepository.createLike(userId, userInfoId, postId);
  //   await this.likeRepository.incrementLikeCount(postId);
  // }

  findAllLike = async () => {
    const likedPost = await this.likeRepository.findAllLike();

    likedPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return likedPost.map((like) => {
      return {
        postId: like.postId,
        likeCount: like.likeCount,
      };
    });
  };
}

module.exports = LikeService;
