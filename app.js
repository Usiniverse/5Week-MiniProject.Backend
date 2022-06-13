// express 패키지 불러옴
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require('./router/userRouter');
const ContentRouter = require('./router/contentRouter');
const commentRouter = require('./router/commentRouter')
const LikeController = require('./router/likeRouter');
const connectDB = require('./database/db');
const reqLogMiddleware = require('./middlewares/request-log-middleware');

const port = 8080;

const corsOption = {
    origin: "http://localhost:3000",
    credentials: true,
    };

// ============================
// DB 연결 - log
connectDB();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); 


// ============================
// 서버 어플리케이션
const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 미들웨어
app.use(reqLogMiddleware);
app.use(cors(corsOption));

// 라우터 등록
app.use("/users", userRouter);
app.use("/content", ContentRouter);
app.use ("/comment", commentRouter);
app.use("/like", LikeController);

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!")
});