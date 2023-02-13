let express=require('express')
let router=express.Router()
let{category}=require('../categoryController/categoryController')
router.get('/category',category)
module.exports=router