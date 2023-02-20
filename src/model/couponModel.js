let mongoose=require('mongoose')
let coupneSchema=mongoose.Schema({
   title:{
    type:String
   },
    coupne:{
        type:String
    },
    amount:{
        type:Number
    },
    discount:{
        type:Number
    },
    limit:{
        type:Number
    },
    start:{
        type:Date
    },
    end:{
        type:Date
    }
})

let couponModel=mongoose.model('couponModel',coupneSchema)
module.exports=couponModel