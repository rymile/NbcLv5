const CommentsService = require("../services/comments.service");

class CommentsController {
  commentService = new CommentsService();

  //get 기능
  getComments = async (req, res, next) => {
    const commnets = await this.commentService.findAllComment();
    res.status(200).json({ data: commnets });
  };
  //post 기능
  createComments = async (req, res, next) => {
    const { postId } = req.params;
    const { comment } = req.body;
    let userId;

    if (res.locals.user) {
      userId = res.locals.user.userId;
    } else {
      return res.status(400).json({ error: "인증되지 않은 사용자입니다." });
    }
    try {
      const createComment = await this.commentService.createComment(
        comment,
        userId,
        postId
      );
      res.status(200).json({ data: createComment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //put기능
  putComments = async (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    try {
      const modifyComment = await this.commentService.putComment(
        commentId,
        comment
      );
      res.status(200).json({ data: modifyComment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //delete 기능
  deleteComments = async (req, res, next) => {
    const { commentId } = req.params;

    try {
      const deleteComment = await this.commentService.deleteComment(commentId);
      res.status(200).json({ data: deleteComment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = CommentsController;
