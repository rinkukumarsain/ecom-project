let orderModel = require("../../model/order");
let Razorpay = require("razorpay");
const { response } = require("express");
const { Aggregate } = require("mongoose");
let addressCollection=require('../../model/addressModel')
let cart=require('../../model/cart')
const { success, error } = require("../../responseApi/responseApi");
exports.createOrder = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_GNG5NS9jh3lJRH",
      key_secret: "6pg6VtMKmGOcIAhgqa1Vz7Eb",
    });

    var options = {
      amount: 100 * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "rcpsadfd1",
    };

    
    instance.orders.create(options, function (err, order) {
        console.log(order)
      success(res, "order is created", 200, order.id);
    });
  } catch (err) {
    error(res, err, 400);
  }
};

exports.razorpayOrder = async (req, res) => {

    // let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
 
  //  var crypto = require("crypto");
  //  var expectedSignature = crypto.createHmac('sha256', '6pg6VtMKmGOcIAhgqa1Vz7Eb')
  //                                  .update(body.toString())
  //                                  .digest('hex');
  //  var response = {"signatureIsValid":"false"}
  //  if(expectedSignature === req.body.response.razorpay_signature)
  //   response={"signatureIsValid":"true"}

  //   if(response)
  //   {
  //     let pipe= [
  //       {
  //         '$match': {
  //           'userId': mongoose.Types.ObjectId(`${req.user._id}`)
  //         }
  //       }, {
  //         '$group': {
  //           '_id': 'null', 
  //           'cartid': {
  //             '$push': '$itemId'
  //           }
  //         }
  //       }, {
  //         '$project': {
  //             '_id': 0
  //         }
  //     }
  //     ]
  //     let aggression = await cart.aggregate(pipe);
    
  //     let address=await addressCollection.findOne({userId:req.user._id})
    
  //     var now = new Date();
  //    const orderData=await order({
    
  //       userId:req.user._id,
  //       productId:aggression[0].cartid,
  //       addressId:address,
  //       total:req.session.sum,
  //       paymentStatus:"success",
  //       paymentId:req.body.response.razorpay_payment_id,
  //       orderId:req.body.response.razorpay_order_id,
  //       razorpaySignature:req.body.response.razorpay_signature,
  //       orderDate:now 
    
  //    })
  //       let savedata=await orderData.save()
  //       let del=await cart.deleteMany()
  //       res.send(savedata); 
  //   }
};
