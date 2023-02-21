const express=require('express')
const router=express.Router()
const {offer,couponCode}=require('../offerController/offerController')
let auth=require('../../middleware/auth')
let registerModel=require('../../model/register')
router.get('/offer',auth(registerModel),offer)
router.post('/couponCode',auth(registerModel),couponCode)
module.exports=router