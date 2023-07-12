const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const cookieParser = require("cookie-parser");

const authMiddleware = async (req, res, next) => {
  cookieParser();

  try {
    const { auth } = req.cookies;
    if (!auth) {
      //로그인되지 않은 상태에서 요청하는 경우
      throw new Error("로그인이 필요한 요청입니다.");
    }
    const [tokenType, token] = auth.split(" ");
    if (tokenType !== "Bearer" || !token) {
      return res
        .status(401)
        .json({ message: "토큰 타입이 일치하지 않습니다." });
    }

    const decodedToken = jwt.verify(token, "secret-key");
    const userId = decodedToken.userId;

    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      res.clearCookie("auth");
      return res
        .status(401)
        .json({ message: "토큰 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;

    next();
  } catch (error) {
    res.clearCookie("auth");
    return res.status(401).json({
      message: "정상적인 요청이 아닙니다.",
    });
  }
};

module.exports = authMiddleware;
