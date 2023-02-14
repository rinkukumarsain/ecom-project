let express=require('express')
let router=express.Router()
let {addToCart,cartItem,removeItemFromCart,updateItemFromCart}=require('../addToCartController/addToCartController')
router.post('/addToCart',addToCart)
router.get('/cartItem',cartItem)
router.post('/removeItemFromCart',removeItemFromCart)
router.post('/updateItemFromCart',updateItemFromCart)
module.exports=router