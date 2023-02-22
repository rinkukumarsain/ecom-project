let orderModel = require("../../model/order");
let Razorpay = require("razorpay");
let mongoose = require("mongoose");
const { response } = require("express");
const { Aggregate } = require("mongoose");
let addressCollection = require("../../model/addressModel");
let cart = require("../../model/cart");
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
      success(res, "order is created", 200, order.id);
    });
  } catch (err) {
    error(res, err, 400);
  }
};

exports.payOrder = async (req, res) => {
  try {
    let pipe = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(`${req.user._id}`),
        },
      },
      {
        $project: {
          userId: 0,
        },
      },
    ];
    let aggression = await cart.aggregate(pipe);
    console.log(aggression);
    if (aggression[0]) {
      let address = await addressCollection.findOne({ userId: req.user._id });
      let order=Math.round(Math.random()*10000000000)
      const orderData = await orderModel({
        userId: req.user._id,
        product: aggression.map((item) => {
          return item;
        }),
        addressId: address,
        total: req.body.finalprice,
        orderId: order,
        orderDate: Date.now(),
        coupon: req.body.coupon,
      });
      let savedata = await orderData.save();
      let del = await cart.deleteMany({ userId: req.user._id });
      success(res, "Order Succssefuly", 200, savedata);
    } else {
      error(res, "No product found to order", 400);
    }
  } catch (err) {
    console.log(err);
    error(res, err, 400);
  }
};
