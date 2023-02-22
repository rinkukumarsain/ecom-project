let express=require('express')
let router=express.Router()
let registerModel=require('../../model/register')
let auth=require('../../middleware/auth')
let {myOrder,delMyOrder}=require('../myOrderController/myOrderController')
router.get('/myOrder',auth(registerModel),myOrder)
router.post('/delMyOrder',delMyOrder)
module.exports=router