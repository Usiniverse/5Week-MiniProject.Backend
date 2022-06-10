const jwt = require("jsonwebtoken");
const userDB = require("../models/user");
const Joi = require("joi");
 
const UserSchema = Joi.object({
    email:
    Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]+@+[0-9a-zA-Z-.]{3,30}$')),
    nickname: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password: Joi.string().required().min(3),
    confirmPassword: Joi.string().required().min(3),
});

//회원가입
async function signUp (req, res) {
    try{
    const { email, nickname, password, confirmPassword } = await UserSchema.validateAsync(req.body);
    if (password !== confirmPassword) {
         return res.status(400).send({ errorMessage: '비밀번호와 비밀번호 확인의 내용이 일치하지 않습니다.', });
    }

    const existUsers = await userDB.getUserByUserName(email);
    if (existUsers.email) {
        return res.status(400).send({errorMessage: '중복된 이메일입니다.',});
    }

    else if (existUsers.nickname) {
        return res.status(400).send({ errorMessage: '중복된 닉네임입니다.', });
   }

    await userDB.createUser({email,nickname, password});

    res.status(201).send({ message : "회원가입에 성공했습니다."});
} catch(err) {
    res.status(400).send({
        errorMessage: '요청한 데이터 형식이 올바르지 않습니다.'
    });
}
};

async function login(req, res) {
    const { email, password } = req.body;
    const user = await userDB.getUserByIdAndPs(email, password);

    if (!user) {
        return res.status(400).send({ errorMessage: "이메일 또는 패스워드가 잘못 되었습니다." });
    }

    const id = user.email;
    const token = jwt.sign({ id }, "yushin-secret-key");
    res.status(200).send({ message : "로그인에 성공했습니다." , token });
}

async function checkMe(req, res) {
    const { user } = res.locals;
    res.send({
        user,
    });
}


module.exports.signUp = signUp;
module.exports.login = login;
module.exports.checkMe = checkMe;