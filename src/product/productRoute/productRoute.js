let express=require('express');
let router=express.Router();
let registerModle=require('../../model/register')
let auth=require('../../middleware/auth')
let {ourTrendingCourses}=require('../productController/productController')

router.get('/ourTrendingCourses',auth(registerModle),ourTrendingCourses)
module.exports=router;