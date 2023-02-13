const videoModel=require('../../model/videoCourse')
let courseDetail=async(req,res)=>{

    let a=await videoModel.find({category:req.body.categoryId})
    res.send(a)
}
module.exports={
    courseDetail
}