let productModel = require("../../model/product");
const { Aggregate } = require("mongoose");
const { success, error } = require("../../responseApi/responseApi");
exports.search = async (req, res) => {
  try {
    let pipe = [
      {
        $match: {
          Name: {
            $regex: `^${req.query.searchitem}`,
          },
        },
      },
    ];
    let aggession = await productModel.aggregate(pipe);
    if (aggession) {
      success(res, "search result", 200, aggession);
    } else {
      error(res, "No Data Found", 400);
    }
  } catch (err) {
    error(res, err, 400);
  }
};
