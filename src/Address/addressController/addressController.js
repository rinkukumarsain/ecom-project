let addressModel = require("../../model/addressModel");
const { success, error } = require("../../responseApi/responseApi");

let address = async (req, res) => {
  try {
    if (
      req.body.phone.toString().length == 10 &&
      req.body.pincode.toString().length == 6
    ) {
      let checkAddress = await addressModel.findOne({ userId: req.user._id });
      req.body.email = req.user.email;
      console.log(req.body.email)
      if (!checkAddress) {
        req.body.userId = req.user._id;
        
        req.body.email = req.user.email;
        console.log(req.body)
        let data = new addressModel(req.body);
        let savea = await data.save();
        success(res, "Address saved Successfuly", 200, savea);
      } else {
        let update = await addressModel.findByIdAndUpdate(
          { _id: checkAddress._id },
          req.body,
          { new: true }
        );
        success(res, "address update Successfuly", 200, update);
      }
    }    else {
      error(res, "enter phone number or pincode properly", 400);
    }
  } catch (e) {
    error(res, e, 400);
  }
};
module.exports = {
  address,
};
