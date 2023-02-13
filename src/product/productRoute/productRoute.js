let express=require('express');
let router=express.Router();
let {ourTrendingCourses}=require('../productController/productController')

router.get('/ourTrendingCourses',ourTrendingCourses)
module.exports=router;