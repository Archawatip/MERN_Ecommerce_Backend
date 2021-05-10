const express = require('express')
const router = express.Router()

const {signup,singin,singout,requireSignin } = require("../controllers/auth");
const {userSingupValidator} = require("../validator")

router.post("/signup",userSingupValidator,signup);
router.post("/signin",singin);
router.get("/signout",singout);

router.get('/hello',requireSignin,(req,res) =>{
    res.send("Hello there");
});

module.exports = router;