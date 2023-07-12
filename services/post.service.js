// 서비스에서는 DB에서 데이터를 받아와 로직을 수행하는 작업을 합니다.
// 서비스 로직을 레포지토리 로직과 연결
const PostRepository = require("../repositories/posts.repository");
const { post } = require("../routes/posts.route");

// 서비스 로직 클래스 정의
class PostService {
  PostRepository = new PostRepository();

  // 게시글 조회
  findAllPost = async () => {
    // 레포지토리 로직의 findAllPost를 수행
    const allPost = await this.PostRepository.findAllPost();

    // 조회 후 생성날짜(createdAt)을 기준으로 정렬함
    // sort((a,b) => b - a)
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 조회한 결과에서 다음의 변수들을 반복해서 조회한다.
    return allPost.map((post) => {
      return {
        postId: post.postId, // postId: 게시글의 postId
        title: post.title, // title: 게시글의 title
        content: post.content, // content: 게시글의 content
      };
    });
  };

  // 게시글 생성
  // 컨트롤러의 createPost 로직을 정의
  createPost = async (title, content, userId) => {
    // title, content가 없을 경우 게시글 생성 제한
    if (!title || !content) {
      throw new Error("제목과 내용을 제공해야 합니다.");
    }
    // 레포지토리 로직 수행
    const createPostData = await this.PostRepository.createPost(
      title,
      content,
      userId
    );
    // 수행한 로직을 리턴
    return createPostData;
  };

  // 게시글 수정
  // 컨트롤러의 putPost 로직을 로직을 정의
  putPost = async (postId, title, content) => {
    // 해당하는 postId가 없을 경우 게시글 수정 제한
    if (!postId) {
      throw new Error("게시글이 존재하지 않습니다.");
    }
    // 레포지토리 로직 수행
    const modifyData = await this.PostRepository.putPost(
      postId,
      title,
      content
    );
    // modifiedPost라는 객체를 하나 더 생성해 결과창을 보여준다.
    const modifiedPost = {
      postId: modifyData[0],
      title: title,
      content: content,
    };
    // modifiedPost 결과창을 호출
    return modifiedPost;
  };

  // 수정과 동일한 로직
  deletePost = async (postId) => {
    if (!postId) {
      throw new Error("게시글이 존재하지 않습니다.");
    }
    const deleteData = await this.PostRepository.deletePost(postId);
    // 레포지토리 로직이 수행되었을 때 deleteDate의 결과값이 1일 경우 게시물의 삭제를 진행
    if (deleteData === 1) {
      return { message: "게시글이 삭제되었습니다." };
    } else {
      throw new Error("게시글 삭제에 실패했습니다.");
    }
  };
}

module.exports = PostService;
