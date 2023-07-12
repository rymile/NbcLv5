const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.route");
const postsRouter = require("./routes/posts.route");
const commentsRouter = require("./routes/comments.route");
const likeRouter = require("./routes/likes.route");
// auth미들웨어를 app.js파일에서 전역변수로 사용한다.
const authMiddleware = require("./middelwares/auth-middleware");
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cookieParser());
// 전역변수로 지정한 authmiddleWare를 사용하는 코드
app.use(authMiddleware);
app.use("/api", [postsRouter, usersRouter, commentsRouter, likeRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
