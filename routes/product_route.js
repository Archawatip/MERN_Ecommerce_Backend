const express = require('express')
const router = express.Router()

const { create ,productById,read,remove,update} = require("../controllers/product_controller")
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user_controller");

router.get('/product/read/:productId',read)
router.post("/product/create/:userId",requireSignin,isAdmin,isAuth,create);
router.delete('/product/delete/:productId/:userId',requireSignin,isAdmin,isAuth,remove)
    router.put('/product/update/:productId/:userId',requireSignin,isAdmin,isAuth,update)


router.param('userId', userById)
router.param('productId',productById)
module.exports = router;