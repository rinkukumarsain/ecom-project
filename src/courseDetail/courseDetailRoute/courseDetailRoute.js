const express=require('express')
let router=express.Router();
const {courseDetail}=require('../courseDetailController/courseDetailController')
router.get('/courseDetail',courseDetail)
module.exports=router