// let categoryModel = require("../../model/category");
const { success, error } = require("../../responseApi/responseApi");
let mongoose = require("mongoose");
let category = async (req, res) => {
  try {
    let find = await categoryModel.find();
    let root = [];
    let child = [];

    find.forEach((node) => {
      if (node.category == null) return root.push(node);
      if (node.category) return child.push(node);
    });

    function recursion(child, root) {
      for (var a of root) {
        a._doc.subcategory = [];
        for (var b of child) {
          if (b.category.toString() == a._id.toString()) {
            a._doc.subcategory.push(b);
          }
        }
        if (a._doc.subcategory != null) {
          recursion(child, a._doc.subcategory);
        }
      }
    }
    recursion(child, root);
    if (root) {
      success(res, "Success", 200, root);
    } else {
      error(res, "Failed", 400);
    }

  } catch (e) {
    console.log(e)
  }
};
module.exports = {
  category,
};
