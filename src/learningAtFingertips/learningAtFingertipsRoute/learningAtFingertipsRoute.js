const express=require('express')
const router=express.Router()
let registerModle=require('../../model/register')
let auth=require('../../middleware/auth')
const {fingertips}=require('../learningAtFingertipsController/learningAtFingertipsController')
router.get('/fingertips',auth(registerModle),fingertips)
module.exports=router