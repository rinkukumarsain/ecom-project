let mongoose=require('mongoose')
let cartSchema=mongoose.Schema({

    itemId:{
        type:mongoose.Schema.Types.ObjectId
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },   
})

let cartModel=mongoose.model('cartmodel',cartSchema)
module.exports=cartModel