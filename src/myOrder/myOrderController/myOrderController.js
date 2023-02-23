let orderModel = require("../../model/order");
let { success, error } = require("../../responseApi/responseApi");
let myOrder = async (req, res) => {
  try {
    let user = req.user._id;
    let orderData = await orderModel.find({ userId: user });
    if (orderData) {
      success(res, "my order item", 200, orderData);
    } else {
      error(res, "No Data Found in your list", 400);
    }
  } catch (err) {
    error(res, err, 400);
  }
};

let delMyOrder = async (req, res) => {
  try {
    let findData = await orderModel.findOne({ orderId: req.query.orderId ,userId:req.user._id});
    if(findData){
        let del = await orderModel.findByIdAndDelete({ _id: findData._id });
        success(res, "remove item from order list", 200, del);
    }else{
        error(res,"no product found",400)
    }
   
  } catch (err) {
    error(res, err, 400);
  }
};
module.exports = {
  myOrder,
  delMyOrder,
};
