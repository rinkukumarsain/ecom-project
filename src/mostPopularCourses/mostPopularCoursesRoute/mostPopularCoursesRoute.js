let express=require('express')
let router=express.Router()
let{mostPopularCourses}=require('../mostPopularCoursesController/mostPopularCoursesController')
router.get('/mostPopularCourses',mostPopularCourses)
module.exports=router