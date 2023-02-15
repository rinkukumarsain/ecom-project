let express=require('express')
let authtoekn=require('../../middleware/auth')
let registerModle=require('../../model/register')
let router=express.Router()
let{mostPopularCourses}=require('../mostPopularCoursesController/mostPopularCoursesController')
router.get('/mostPopularCourses',authtoekn(registerModle),mostPopularCourses)
module.exports=router