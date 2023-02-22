let orderModel=require('../../model/order')
let myOrder=async(req,res)=>{

    let user=req.user._id
    let orderData=await orderModel.find({userId:user})
    res.send(orderData)
}

let delMyOrder=async(req,res)=>{

}
module.exports={
    myOrder,
    delMyOrder
}