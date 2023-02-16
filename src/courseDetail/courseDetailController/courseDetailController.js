const videoModel=require('../../model/videoCourse')
let productModel=require('../../model/product')
const { success, error } = require("../../responseApi/responseApi");
let courseDetailAfterBuy=async(req,res)=>{

  try{

    let videoData=await videoModel.find({category:req.query.categoryId})
    if(videoData){    
        success(res, "Successfuly", 200,videoData);
      } else {
        error(res, "Wrong Password", 400);
      }
  }catch(err)
  {
    error(res,err,400)
  }

}
let courseDetailBeforeBuy=async(req,res)=>{
  try{
    let productDetail = await productModel.findOne({_id:req.query.Id})
    console.log(productDetail,".....")
    if(productDetail){    
    success(res, "Successfuly", 200,productDetail);
  } else {
    error(res, "failed", 400);
  }

  }catch(err)
  {
    error(res,err,400)
  }

}
module.exports={
    courseDetailAfterBuy,
    courseDetailBeforeBuy
}