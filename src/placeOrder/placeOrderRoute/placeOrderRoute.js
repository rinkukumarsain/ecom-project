const express=require('express')
let router=express.Router()
const{createOrder,payOrder}=require('../placeOrderController/placeOrderController')
let auth=require('../../middleware/auth')
let registerModel=require('../../model/register')
router.post("/createOrder",auth(registerModel),createOrder)
router.post("/payOrder",auth(registerModel),payOrder)
module.exports=router