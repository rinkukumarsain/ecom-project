let express=require('express')
let router=express.Router();
let auth=require('../../middleware/auth')
let registerModel=require('../../model/register')
const{address}=require('../addressController/addressController')
router.post('/address',auth(registerModel),address)
module.exports=router