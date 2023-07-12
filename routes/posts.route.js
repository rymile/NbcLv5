// 라우트 파일은 컨트롤러에 접근하는 역할을 합니다.
const express = require("express");
const router = express.Router();

// 포스트컨트롤러를 라우터에서 연결
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

// api호출 명령어 정의
router.get("/posts", postsController.getPosts); // 조회
router.post("/posts", postsController.createPost); // 생성
router.put("/posts/:postId", postsController.putPost); // 수정
router.delete("/posts/:postId", postsController.deletePost); //삭제

module.exports = router;

// 레이어드 아키텍처 로직 수행 처리 과정
// 1. app.js에서 라우터를 받기 위해 라우트폴더의 파일로 접근
// 2. 라우트 파일에서는 컨트롤러를 받기 위해 컨트롤러 폴더의 컨트롤러로 접근한다.
// 3. 컨트롤러 파일에서는 라우터에서 요청하는 처리를 수행하고
// 4. 추가적으로 데이터 처리를 위해 서비스 폴더의 파일로 접근
// 5. 서비스에서는 DB에서 데이터를 받아와 로직을 수행하는 작업을 거친다.
// 6. 이후 작업을 거치고 나서 레포지토리로 이동해 DB와 접근하여 로직처리를 수행

// const express = require("express");
// const { Posts } = require("../models");
// const authMiddleware = require("../middelwares/auth-middleware");
// const router = express.Router();

// //게시글 작성
// router.post("/posts", authMiddleware, async (req, res) => {
//   const { userId } = res.locals.user;
//   const { title, content } = req.body;

//   const post = await Posts.create({
//     UserId: userId,
//     title,
//     content,
//   });
//   return res.status(201).json({ data: post });
// });

// //게시글 전체조회
// router.get("/posts", async (req, res) => {
//   const posts = await Posts.findAll({
//     attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
//     order: [["createdAt", "DESC"]],
//   });
//   return res.status(200).json({ data: posts });
// });

// // 게시글 상세 조회
// router.get("/posts/:postId", async (req, res) => {
//   const { postId } = req.params;
//   const post = await Posts.findOne({
//     attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
//     where: { postId },
//   });

//   return res.status(200).json({ data: post });
// });

// 게시글 수정
// router.put("/posts/:postId", authMiddleware, async (req, res) => {
//   const { userId } = res.locals.user;
//   const { postId } = req.params;
//   const { title, content } = req.body;

//   const post = await Posts.findOne({ where: { postId, UserId: userId } });
//   if (!post) {
//     return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
//   }

//   await Posts.update({ title, content }, { where: { postId, UserId: userId } });

//   return res.status(200).json({ message: "게시글이 수정되었습니다." });
// });

// // 게시글 삭제
// router.delete("/posts/:postId", authMiddleware, async (req, res) => {
//   const { userId } = res.locals.user;
//   const { postId } = req.params;

//   const post = await Posts.findOne({ where: { postId, UserId: userId } });
//   if (!post) {
//     return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
//   }

//   await Posts.destroy({ where: { postId, UserId: userId } });

//   return res.status(200).json({ message: "게시글이 삭제되었습니다." });
// });

// module.exports = router;
