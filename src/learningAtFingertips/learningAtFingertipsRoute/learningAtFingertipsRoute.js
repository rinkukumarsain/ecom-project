const express=require('express')
const router=express.Router()
const {fingertips}=require('../learningAtFingertipsController/learningAtFingertipsController')
router.get('/fingertips',fingertips)
module.exports=router