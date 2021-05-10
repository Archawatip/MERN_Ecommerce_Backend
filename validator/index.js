exports.userSingupValidator = (req,res,next) =>{
    req.check('name','โปรดระบุชื่อของคุณ').notEmpty()
    req.check('email','โปรดระบุอีเมลของคุณ').notEmpty()
    req.check('email','อีเมลต้องมีความยาวระหว่าง 3-32 ตัวอักษร')
        .matches(/.+\@.+\..+/)
        .withMessage('อีเมลต้องประกอบไปด้วย @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password','โปรดระบุรหัสผ่านของคุณ').notEmpty()
    req.check('password')
        .isLength({min: 6})
        .withMessage('รหัสผ่านจำเป็นต้องมีอย่างน้อย 6 คัว')
        .matches(/\d/)
        .withMessage('รหัสผ่านจำเป็นต้องประกอบด้วยตัวเลข')
        const errors = req.validationErrors()
        if (errors){
            const firstError = errors.map(errors => errors.msg)[0];
            return res.status(400).json({errors: firstError });
        }
        next();
}