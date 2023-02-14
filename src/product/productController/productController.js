const { success, error } = require("../../responseApi/responseApi");
const productmodel = require('../../model/product');
let ourTrendingCourses=async(req,res)=>{
console.log("agg")
  let  aggCursor = await productmodel.find({trending:1});
  console.log(aggCursor)
  if(aggCursor)
  {
    success(res, " Success", 200,aggCursor);
  }
  else{
    error(res, "Failed", 400);
  }
}
module.exports={ourTrendingCourses}