let express=require('express')
let router=express.Router()
let{ register }=require('../registerController/regController')

router.post('/register',register)
module.exports=router
