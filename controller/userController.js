const jwt = require("jsonwebtoken");
const userDB = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const UserSchema = Joi.object({
    email:
        Joi.string()
        .required()
        .pattern(new RegExp('^[0-9a-zA-Z]+@+[0-9a-zA-Z]+.+[a-zA-Z]$')),
    
    nickname: 
        Joi.string()
        .required()
        .pattern(new RegExp('^[0-9a-zA-Z@$!%#?&]{3,10}$')),
    
    password: 
        Joi.string()
        .required()
        .min(3),
    
    confirmPassword: 
        Joi.string()
        .required()
        .min(3),
});


//회원가입
async function signUp (req, res) {
    try{
    const { email, nickname, password, confirmPassword } = await UserSchema.validateAsync(req.body);

    if (password !== confirmPassword) {
        return res.status(400).send({ errorMessage: '비밀번호와 비밀번호 확인의 내용이 일치하지 않습니다.', });
    }
    
    const existUsers = await userDB.findOne({email});
    if(existUsers){
        return res.status(400).send({errorMessage: '중복된 이메일입니다.',});
    }
    // false 인경우 email check X
    const existUsersNickname = await userDB.findOne({nickname});
    if(existUsersNickname){
        return res.status(400).send({ errorMessage: '중복된 닉네임입니다.', });
        }

    res.status(201).send({ message : "회원가입에 성공했습니다."});

    const users = new userDB({ email, nickname, password });
    await users.save();

} catch(err) {
    res.status(400).send({
        errorMessage: '요청한 데이터 형식이 올바르지 않습니다.'
    });
}};

//로그인
async function login(req, res) {
    const { email, password } = req.body;
    const user = await userDB.findOne({email});


    const userCompared = await bcrypt.compare(password, user.password);
    if(!userCompared){
        return res.status(400).send({errorMessage: "이메일이나 비밀번호가 올바르지 않습니다."})
    }

       //비밀번호까지 맞다면 토큰을 생성하기.
        const token = jwt.sign({ authorId: user.authorId }, "yushin-secret-key");
        res.status(200).send({ message : "로그인에 성공했습니다." , token });
    }

//사용자 인증
async function checkMe(req, res) {
    const { user } = res.locals;
    res.send({
        user,
    });
    };


module.exports.signUp = signUp;
module.exports.login = login;
module.exports.checkMe = checkMe;