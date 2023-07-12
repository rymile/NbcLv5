// 레포지토리는 DB에 접근하여 로직을 수행합니다.
// Posts, Comments 테이블에 접근
const { Posts, Comments } = require("../models");

// 레포지토리 클래스 정의
class CommentsRepository {
  findAllComment = async () => {
    const comments = await Comments.findAll();
    return comments;
  };

  createComment = async (comment, postId, userId) => {
    const post = await Posts.findOne({ where: { postId } });
    if (!post) {
      throw new Error("게시물을 찾을 수 없습니다.");
    }
    const createCommentData = await Comments.create({
      comment,
      PostId: postId,
      UserId: userId,
    });
    return createCommentData;
  };

  putComment = async (commentId, comment) => {
    const modifyComment = await Comments.update(
      {
        comment,
      },
      {
        where: {
          commentId,
        },
      }
    );
    return modifyComment;
  };

  deleteComment = async (commentId) => {
    const deleteData = await Comments.destroy({
      where: {
        commentId: commentId,
      },
    });

    return deleteData;
  };
}

module.exports = CommentsRepository;
