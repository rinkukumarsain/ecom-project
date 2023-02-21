let couponModel = require("../../model/couponModel");
const { success, error } = require("../../responseApi/responseApi");
let cartModel = require("../../model/cart");
let orderModel = require("../../model/order");
const { count } = require("../../model/register");
exports.offer = async (req, res) => {
  try {
    let coupon = await couponModel.find();
    if (coupon) {
      success(res, "coupon", 200, coupon);
    } else {
      error(res, "No Coupon", 400);
    }
  } catch (err) {
    error(res, err, 400);
  }
};

exports.couponCode = async (req, res) => {
  try {
    let cartData = await cartModel.find({ userId: req.user._id });
    
    let couponData = await couponModel.findOne({ coupne: req.body.coupon});
    let total = 0;
    for (let i = 0; i < cartData.length; i++) {
      total += cartData[i].price * cartData[i].quantity;
    }
    if (couponData) {
      let couponCount = await orderModel.find({
        coupon: req.body.coupon,
        userId: req.user._id,
      });
      if (couponData.limit > couponCount.length) {
        if (Date.now() > couponData.start && Date.now() < couponData.end) {
          if (total >= couponData.amount) {
            let discount = couponData.discount;
            let coupon = req.body.coupon;
            let finalprice = total - discount;
            result = { total, discount, finalprice, coupon };
            success(res, "dicount product", 200, result);
          } else {
            error(
              res,
              `Discount is only valid upon ₹ ${couponData.amount}`,
              400
            );
          }
        } else {
          error(res, "invalid time", 400);
        }
      } else {
        error(res, "your coupon limit is over", 400);
      }
    } else {
      let discount = 0;
      let finalprice = total;
      result = { total, discount, finalprice };
      success(res, "dicount product", 200, result);
    }
  } catch (err) {
    console.log(err)
    error(res, err, 400);
  }
};
