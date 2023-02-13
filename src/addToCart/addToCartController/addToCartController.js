let cartModel=require('../../model/cart')
let productModel=require('../../model/product')
let addToCart=async(req,res)=>{

    console.log(req.body.itemId)
    let findData=await productModel.findOne({_id:req.body.itemId})
    let cartData=new cartModel({
        itemId:req.body.itemId,
        price:findData.price,
        quantity:1,
        userId:req.body.userId
    })
    cartSave=await cartData.save()
    if(cartSave)
    {
        res.send(cartSave)
    }else{
        res.send("no data")
    }
}
module.exports={
    addToCart
}