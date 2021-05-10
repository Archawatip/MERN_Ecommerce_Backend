const  Auth = require("../models/user");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
const {errorHandler} = require("../helpers/DBerrorHandler")



exports.signup = (req,res) => {
    // console.log("req.body",req.body);
  const user = new Auth(req.body);
  user.save((err,user) => {
      if(err){
          return res.status(400).json({
              err: errorHandler(err)
          });
      }
      user.salt = undefined;
      user.hashed_password = undefined;

      res.json({
          user
      });

  })
}

exports.singin = (req,res) => {
    const {email,password} = req.body
    Auth.findOne({email},(err, user) => {
        if (err || !user){
            return res.status(400).json ({
                error:"ไม่พบอีเมลนี้ในระบบ.โปรดลงทะเบียนก่อนใช้งาน"
            });
        }

        if (!user.authenticate(password)){
            return res.status(401).json({
                error: 'อีเมลและรหัสผ่านไม่ตรงกัน'
            })
        }

        // authenticate
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
        res.cookie('t',token,{expire: new Date()+9999})

        const {_id, name, email, role} = user
        return res.json({token,user:{_id, email, name, role}});

    })
}

exports.singout = (req,res) =>{
    res.clearCookie('t')
    res.json({
        message: 'Singout success'
    });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});


exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user){
        return res.status(403).json({
            error: 'การเข้าถึงถูกปฎิเสธ'
        });
    }
    next();
}

exports.isAdmin = (req,res,next) => {
    if (req.profile.role === 0){
        return res.status(403).json({
            error: 'สำหรับผู้ดูแลระบบเทานั้น'
        });
        }
    next();
}