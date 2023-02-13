const express=require('express')
const router=express.Router();
const{login}=require('../loginController/loginController')

router.post('/login',login)
module.exports=router