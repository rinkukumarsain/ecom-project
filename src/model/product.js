const mongoose=require('mongoose')

const productschema=mongoose.Schema({

    Name:{
        type:String
    },
    slug:{
        type:String
    },
    image:{
        type:String
    },
    type:{
        type:String
    },
    content:{
        type:String,
    },
    time:{
        type:String
    },
    lectures:{
        type:String
    },
    price:{
        type:String
    },
     category:{
       type: mongoose.Schema.Types.ObjectId
    },
    trending:{
        type:Number,
        default:0,
    },
    popular:{
        type:Number,
        default:1,
    }
})

const productmodel=new mongoose.model('product',productschema);
module.exports=productmodel