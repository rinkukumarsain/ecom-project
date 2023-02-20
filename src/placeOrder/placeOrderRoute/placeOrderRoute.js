const express=require('express')
let router=express.Router()
const{createOrder,razorpayOrder}=require('../placeOrderController/placeOrderController')
let auth=require('../../middleware/auth')
let registerModel=require('../../model/register')
router.post("/createOrder",auth(registerModel),createOrder)
router.post("/razorpayOrder",auth(registerModel),razorpayOrder)
module.exports=router