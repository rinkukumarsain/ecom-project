const express=require('express')
const router=express.Router()
const{forgotPassword,setNewPassword}=require('../forgotPassController/forgotPassController')
router.post('/forgotPassword',forgotPassword)
router.post('/setNewPassword',setNewPassword)
module.exports=router