let cartModel=require('../../model/cart')
let productModel=require('../../model/product')
const { success, error } = require("../../responseApi/responseApi");
let addToCart=async(req,res)=>{

    
    let findData=await productModel.findOne({_id:req.body.itemId})
    let check=await cartModel.findOne({userId:req.body.userId,itemId:req.body.itemId})
    if(!check)
    {
        let cartData=new cartModel({
            itemId:req.body.itemId,
            price:findData.price,
            quantity:1,
            userId:req.body.userId
        })
        cartSave=await cartData.save()
        if(cartSave)
        {
         success(res, "Successfuly", 200,cartSave);
        } else {
          error(res, "no data", 400);
        }
    }else{
        error(res, "product  are already into the cart", 400);
    }
 
}
module.exports={
    addToCart
}