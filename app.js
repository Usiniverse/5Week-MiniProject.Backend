// express 패키지 불러옴
const express = require("express");
const mongoose = require("mongoose");
const port = 8080;
const userRouter = require('./router/userRouter');
const articleRouter = require('./router/contentRouter');
const ssrRouter = require('./router/ssrRouter');
const connectDB = require('./database/db');
const reqLogMiddleware = require('./middlewares/request-log-middleware');
const cookieParser = require("cookie-parser");

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

//cookieparser
app.use(cookieParser());

// 미들웨어
app.use(reqLogMiddleware);

// 라우터 등록
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/", ssrRouter);

// ssr 엔진
app.set('view engine', 'ejs'); // ejs 사용을 위해 view engine 에 ejs set
// app.use(express.static(__dirname + '/public'));


// server 시작
// port 뒤에 () <- 2번째 인자 값은 서버가 켜진 뒤 호출된다
app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요!")
});