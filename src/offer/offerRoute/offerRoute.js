const express=require('express')
const router=express.Router()
const {offer}=require('../offerController/offerController')
let auth=require('../../middleware/auth')
let registerModel=require('../../model/register')
router.get('/offer',auth(registerModel),offer)
module.exports=router