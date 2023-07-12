// 레포지토리는 DB에 접근하여 로직을 수행합니다.
// Posts 테이블에 접근
const { Posts } = require("../models");

// 레포지토리 클래스 정의
class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();
    // 요청한 데이터를 리턴
    return posts;
  };

  createPost = async (title, content, userId) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({
      // 생성할 데이터 정의
      title,
      content,
      UserId: userId,
    });
    // 요청한 데이터를 리턴합니다.
    // 처리순서(역순) 레포지토리>서비스>컨트롤러>라우트
    // 처리순서 라우트>컨트롤러>서비스>레포지토리

    // createPostData 리턴
    return createPostData;
  };
  // ORM인 Sequelize에서 Posts 모델의 putPsot 메소드를 사용해 데이터를 요청합니다.
  putPost = async (postId, title, content) => {
    const modifyData = await Posts.update(
      // 수정할 데이터 정의
      {
        title,
        content,
      },
      //수정할 데이터는 postId로 한번 더 조회하여 해당 postId일 경우에만 수정을 진행합니다.
      {
        where: {
          postId,
        },
      }
    );
    return modifyData;
  };

  // 수정로직과 동일함
  deletePost = async (postId) => {
    const deletedData = await Posts.destroy({
      where: {
        postId: postId,
      },
    });

    return deletedData;
  };
}

module.exports = PostRepository;
