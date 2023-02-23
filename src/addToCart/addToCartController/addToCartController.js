let cartModel = require("../../model/cart");
let productModel = require("../../model/product");
const { Aggregate, mongo, default: mongoose } = require("mongoose");
const { success, error } = require("../../responseApi/responseApi");
let addToCart = async (req, res) => {
  try{
    let findData = await productModel.findOne({ _id: req.body.itemId });
    let check = await cartModel.findOne({
      userId: req.user._id,
      itemId: req.body.itemId,
    });
    if (!check) {
      let cartData = new cartModel({
        itemId: req.body.itemId,
        price: findData.price,
        quantity: 1,
        userId:req.user._id,
      });
      cartSave = await cartData.save();
      if (cartSave) {
        success(res, "Successfuly", 200, cartSave);
      } else {
        error(res, "no data", 400);
      }
    } else {
      error(res, "product are already into the cart", 400);
    }

  }catch(e){
   
    error(res, e, 400);
  }

};

let cartItem = async (req, res) => {

  try{

    // console.log(req.user._id,"userrrrrr")
    let pipe = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(`${req.user._id}`),
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            itemId: "$itemId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$itemId"],
                },
              },
            },
          ],
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $project: {
          name: "$result.Name",
          image: "$result.image",
          itemId: 1,
          price: 1,
          quantity: 1,
          userId: 1,
        },
      },
    ];
    let aggression = await cartModel.aggregate(pipe);
    let total = 0;
    for (let i = 0; i < aggression.length; i++) {
      let oneItem = aggression[i].price * aggression[i].quantity;
      total += oneItem;
    }
    let data = {
      aggression,
      total,
    };
    if (aggression) {
      success(res, "Successfuly", 200, data);
    } else {
      error(res, "failed", 400);
    }

  }catch(err){
    error(res, err, 400);
  }
};

let removeItemFromCart = async (req, res) => {

  try{
    let find = await cartModel.findOne({itemId: req.body.itemId,userId:req.user._id});

    let removeItem = await cartModel.findByIdAndDelete({ _id: find._id });
    let pipe = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(`${req.user._id}`),
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            itemId: "$itemId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$itemId"],
                },
              },
            },
          ],
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $project: {
          name: "$result.Name",
          image: "$result.image",
          itemId: 1,
          price: 1,
          quantity: 1,
          userId: 1,
        },
      },
    ];
    let aggression = await cartModel.aggregate(pipe);
    let total = 0;
    for (let i = 0; i < aggression.length; i++) {
      let oneItem = aggression[i].price * aggression[i].quantity;
      total += oneItem;
    }
    let data = {
      removeItem,
      aggression,
      total,
    };
    if (aggression) {
      success(res, "Successfuly", 200, data);
    } else {
      error(res, "failed", 400);
    }
  }catch(err){
    error(res,err,400)
  }

};
let updateItemFromCart = async (req, res) => {

  
  try{

    let find = await cartModel.findOne({
      itemId: req.body.itemId,
      userId: req.user._id,
    });
  
    
    let updateItem = await cartModel.findByIdAndUpdate(
      { _id: find._id },
      { quantity: req.body.quantity },
      { new: true }
    );
    let pipe = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(`${req.user._id}`),
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            itemId: "$itemId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$itemId"],
                },
              },
            },
          ],
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $project: {
          name: "$result.Name",
          image: "$result.image",
          itemId: 1,
          price: 1,
          quantity: 1,
          userId: 1,
        },
      },
    ];
    let aggression = await cartModel.aggregate(pipe);
    let total = 0;
    for (let i = 0; i < aggression.length; i++) {
      let oneItem = aggression[i].price * aggression[i].quantity;
      total += oneItem;
    }
    let data = {
      aggression,
      total,
    };
    if (aggression) {
      success(res, "Successfuly", 200, data);
    } else {
      error(res, "failed", 400);
    }

  }catch(err)
  {
    error(res,err,400)
  }
};
module.exports = {
  addToCart,
  cartItem,
  removeItemFromCart,
  updateItemFromCart,
};
