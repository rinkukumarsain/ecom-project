const express=require('express')
let router=express.Router();
const {courseDetailAfterBuy,courseDetailBeforeBuy}=require('../courseDetailController/courseDetailController')
router.get('/courseDetailAfterBuy',courseDetailAfterBuy)
router.get('/courseDetailBeforeBuy',courseDetailBeforeBuy)
module.exports=router