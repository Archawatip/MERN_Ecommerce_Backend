const User = require('../models/user')

exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err,user)=>{
        if (err || !user){
            return res.status(400).json({
                error: 'ไม่พบผู้ใช้นี้ในระบบ'
            });
        }
        req.profile = user;
        next();
    })
}