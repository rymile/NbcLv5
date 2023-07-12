// 컨트롤러 파일에서는 라우터에서 요청하는 처리를 수행합니다.
// 포스트 컨트롤러 로직과 서비스 로직을 연결
const PostService = require("../services/post.service");

// 포스트컨트롤러 클래스 정의
class PostsController {
  postService = new PostService();

  //get 기능
  getPosts = async (req, res, next) => {
    // 서비스 로직에서 findAllPost 실행
    const posts = await this.postService.findAllPost();
    // 조회한 결과값을 결과창에 출력
    res.status(200).json({ data: posts });
  };

  //post 기능
  createPost = async (req, res, next) => {
    // 작성할 내용 구조분해할당으로 정의
    const { title, content } = req.body;
    // userId를 미리 선언하여 이후의 로직에서 사용할 수 있도록 함
    let userId;

    // locals.user의 userId와 일치하는 사용자가 있는지 확인 후 if로직을 통과
    if (res.locals.user) {
      userId = res.locals.user.userId;
      // 아닐 경우엔 else로직에서 status 400 호출
    } else {
      return res.status(400).json({ error: "인증되지 않은 사용자입니다." });
    }
    // if문 통과 후 서비스로직에서 title, content를 포함한 게시글을 작성
    // userId를 사용하여 게시글을 작성함
    try {
      const createdPost = await this.postService.createPost(
        title,
        content,
        userId
      );
      res.status(200).json({ data: createdPost });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //put기능
  putPost = async (req, res, next) => {
    // 게시글의 postId를 파라미터로 받아옴
    const { postId } = req.params;
    // 수정할 내용을 구조분해할당으로 정의
    const { title, content } = req.body;

    try {
      // 서비스 로직에서 postId, title, content를 조회하여 해당 게시글을 수정함
      const modifyPost = await this.postService.putPost(postId, title, content);
      res.status(200).json({ data: modifyPost });
      // 게시글이 수정되지 않았을 경우 에러 메시지를 결과로 호출
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //delete 기능
  // 수정 기능과 동일한 기능을 수행함
  deletePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const deletePost = await this.postService.deletePost(postId);
      res.status(200).json({ data: deletePost });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = PostsController;
