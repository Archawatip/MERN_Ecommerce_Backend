const User = require('../models/user_model')

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err, user)=>{
        if (err || !user){
            return res.status(400).json({
                error: 'ไม่พบผู้ใช้นี้ในระบบ'
            });
        }
        req.profile = user;
        next();
    })
}

exports.read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile);
}

exports.update = (req,res) => {
    User.findOneAndUpdate({_id:req.profile},
        {$set: req.body},
        {new: true},
        (err,user) =>{
        if (err){
            return res.status(400).json({
                error: 'คุณต้องเข้าสู่ระบบเพื่อดำเนินการต่อ'
            })
        }
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        })
}