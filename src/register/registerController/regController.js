let registerModel=require('../../model/register')
let bcrypt = require("bcryptjs");
const {success,error}=require('../../responseApi/responseApi')
let register=async(req,res)=>{
try{
   

    let password=req.body.password.toString()
    let confirmpassword=req.body.confirmpassword.toString()

    
    let find=await registerModel.findOne({email:req.body.email})
    if(!find){
        if(password===confirmpassword)
        {
            let hashPassword=await bcrypt.hash(password, 10);
            let hashConfirmpassword=await bcrypt.hash(confirmpassword,10)
           req.body.password=hashPassword
           req.body.confirmpassword=hashConfirmpassword
            let data=new registerModel(req.body)

            let save=await data.save()
            success(res,"Register Successfully",200)
            // res.status(200).send({message:"Register Successfully"})
        }
        else{
            error(res, "Password and Confirm Password are not matched", 400); 
        }
    }
    else{
        error(res, "Email is already exist", 400);
    }
   
}catch(e){

    error(res,e,400)
} 
   
}

module.exports={
    register
}