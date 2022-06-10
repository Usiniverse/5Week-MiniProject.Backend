const jwt = require("jsonwebtoken");
const userDB = require("../models/user");

async function signUp (req, res) {
    console.log(req.body);
    const { authorName, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        // 비밀번호, 비밀번호 확인 일치 여부 확인
        return res.status(400).send({ errorMessage: '비밀번호와 비밀번호 확인의 내용이 일치하지 않습니다.', });
    }

    const existUsers = await userDB.getUserByAuthorName(authorName);
    if (existUsers.length) {
        // authorName 중복 데이터가 존재 할 경우
        return res.status(400).send({errorMessage: '중복된 닉네임입니다.',});
    }

    await userDB.createUser({authorName, password});

    res.status(201).send({ message : "회원가입에 성공했습니다."});
}

async function login(req, res) {
    const { authorName, password } = req.body;
    const user = await userDB.getUserByIdAndPs(authorName, password);

    if (!user) {
        return res.status(400).send({ errorMessage: "이메일 또는 패스워드가 잘못 되었습니다." });
    }

    const id = user.authorId;
    const token = jwt.sign({ id }, "yushin-secret-key");
    res.status(200).send({ message : "로그인에 성공했습니다." , token });
}

async function checkMe(req, res) {
    const { user } = res.locals;
    res.send({
        user: {
            authorId: user.authorId,
            authorName: user.authorName,
        },
    });
}


module.exports.signUp = signUp;
module.exports.login = login;
module.exports.checkMe = checkMe;