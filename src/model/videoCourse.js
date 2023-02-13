const mongoose=require('mongoose')

const videoSchmea=mongoose.Schema({

    Name:{
        type:String
    },
    slug:{
        type:String
    },
    image:{
        type:String
    },
    video:{
        type:String
    },
   
     category:{
       type: mongoose.Schema.Types.ObjectId
    },
})

const videoModel=new mongoose.model('videoModel',videoSchmea);
module.exports=videoModel