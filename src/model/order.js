let mongoose=require('mongoose')

const orderSchema=mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    productId:{
        type:Array
    },
    addressId:{
        type:mongoose.Schema.Types.ObjectId
    },
    total:{
        type:Number
    },
    paymentStatus:{
        type:String
    },
    paymentId:{

        type:String
    },
    orderId:{
        type:String
    },
    orderStatus:{
        type:String
    },
    razorpaySignature:{
        type:String
    },
    orderDate:{
        type:Date
    }
})

const orderModel=new mongoose.model('order',orderSchema)
module.exports=orderModel