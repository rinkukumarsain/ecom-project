let addressModel=require('../../model/addressModel')
let address=async(req,res)=>{

    try{
        if(req.body.phone.toString().length==10 && req.body.pincode.toString().length==6)
        {
          req.body.userId=req.user._id
            let data=new addressModel(req.body)
            let save=data.save()
            res.send(save)
        }else
        {
            res.send("enter phone number or pincode properly")
        }
    }catch(e){
        res.send(e)
    }
   
   
}
module.exports={
    address
}