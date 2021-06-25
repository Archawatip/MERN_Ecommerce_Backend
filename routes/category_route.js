const express = require('express')
const router = express.Router()

const { create } = require("../controllers/category_controller")
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user_controller");

router.post("/category/create/:userId",requireSignin,isAdmin,isAuth,create);


router.param('userId', userById)
module.exports = router;