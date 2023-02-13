let jwt=require('jsonwebtoken')
const registerModle = require('../model/register')

const auth=async(req,res,next)=>{

    try{

        const token=req.cookies.jwt
        console.log(token)
        const verifyUser=jwt.verify(token,process.env.SECRATE_KEY)
        console.log(verifyUser)
        next()
    }
    catch(e){
        console.log(e)
    }
}