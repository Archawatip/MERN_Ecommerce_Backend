const User_controller = require('../models/user_model')

exports.userById = (req,res,next,id) => {
    User_controller.findById(id).exec((err, user)=>{
        if (err || !user){
            return res.status(400).json({
                error: 'ไม่พบผู้ใช้นี้ในระบบ'
            });
        }
        req.profile = user;
        next();
    })
}