const { success, error } = require("../../responseApi/responseApi");
const productmodel = require("../../model/product");
let ourTrendingCourses = async (req, res) => {
  let aggCursor = await productmodel.find({ trending: 1 });
  if (aggCursor) {
    success(res, " Success", 200, aggCursor);
  } else {
    error(res, "Failed", 400);
  }
};
module.exports = { ourTrendingCourses };
