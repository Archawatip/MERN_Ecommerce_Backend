const express = require('express')
const router = express.Router()

const { create ,categoryById,read,update,remove,list } = require("../controllers/category_controller")
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user_controller");

router.get('/category/read/:categoryId',read)
router.post("/category/create/:userId",requireSignin,isAdmin,isAuth,create);
router.put("/category/update/:categoryId/:userId",requireSignin,isAdmin,isAuth,update);
router.delete("/category/delete/:categoryId/:userId",requireSignin,isAdmin,isAuth,remove);
router.get('/category',list)

router.param('categoryId',categoryById)
router.param('userId', userById)
module.exports = router;