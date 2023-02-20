let couponModel = require("../../model/couponModel");
const { success, error } = require("../../responseApi/responseApi");
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
// module.exports = {
//   offer
// };
