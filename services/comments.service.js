const CommentsRepository = require("../repositories/comments.repository");

class CommentService {
  commentsRepository = new CommentsRepository();

  findAllComment = async () => {
    const allComment = await this.commentsRepository.findAllComment();

    allComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allComment.map((comment) => {
      return {
        commentId: comment.commentId,
        comment: comment.comment,
      };
    });
  };

  createComment = async (comment, userId, postId) => {
    if (!comment) {
      throw new Error("작성된 댓글이 없습니다.");
    }
    const createCommentData = await this.commentsRepository.createComment(
      comment,
      postId,
      userId
    );
    return createCommentData;
  };

  putComment = async (commentId, comment) => {
    if (!commentId) {
      throw new Error("작성된 댓글이 없습니다.");
    }
    const modifyData = await this.commentsRepository.putComment(
      commentId,
      comment
    );
    const modifiedComment = {
      commentId: modifyData[0],
      comment: comment,
    };
    return modifiedComment;
  };

  deleteComment = async (commentId) => {
    if (!commentId) {
      throw new Error("작성된 댓글이 없습니다.");
    }
    const deleteData = await this.commentsRepository.deleteComment(commentId);
    if (deleteData === 1) {
      return { message: "댓글이 삭제되었습니다." };
    } else {
      throw new Error("댓글 삭제에 실패했습니다.");
    }
  };
}

module.exports = CommentService;
