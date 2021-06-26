const express = require('express')
const router = express.Router()

const { create ,productById,read,remove,update,list,listRelated,listCategories,listBySearch} = require("../controllers/product_controller")
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user_controller");


router.get('/products',list)
router.get('/products/related/:productId',listRelated)

router.get('/product/read/:productId',read)
router.post("/product/create/:userId",requireSignin,isAdmin,isAuth,create);
router.delete('/product/delete/:productId/:userId',requireSignin,isAdmin,isAuth,remove)
router.put('/product/update/:productId/:userId',requireSignin,isAdmin,isAuth,update)
router.post('/products/by/search',listBySearch)

router.get ('/products/categories',listCategories)


router.param('userId', userById)
router.param('productId',productById)
module.exports = router;