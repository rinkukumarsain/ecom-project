const express=require('express')
let router=express.Router()
const{search}=require('../searchingController/searchingController')
let auth=require('../../middleware/auth')
let registerModel=require('../../model/register')
router.get('/search',search)
module.exports=router