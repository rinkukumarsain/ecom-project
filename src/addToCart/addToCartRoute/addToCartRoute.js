let express=require('express')
let router=express.Router()
let {addToCart}=require('../addToCartController/addToCartController')

router.post('/addToCart',addToCart)
module.exports=router