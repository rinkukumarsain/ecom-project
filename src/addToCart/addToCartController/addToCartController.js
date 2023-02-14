let cartModel = require("../../model/cart");
let productModel = require("../../model/product");
const { Aggregate, mongo, default: mongoose } = require("mongoose");
const { success, error } = require("../../responseApi/responseApi");
let addToCart = async (req, res) => {
  let findData = await productModel.findOne({ _id: req.body.itemId });
  let check = await cartModel.findOne({
    userId: req.body.userId,
    itemId: req.body.itemId,
  });
  if (!check) {
    let cartData = new cartModel({
      itemId: req.body.itemId,
      price: findData.price,
      quantity: 1,
      userId: req.body.userId,
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
};

let cartItem = async (req, res) => {
  let pipe = [
    {
      $match: {
        userId: mongoose.Types.ObjectId(`${req.query.userId}`),
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
};

let removeItemFromCart = async (req, res) => {
  let find = await cartModel.findOne({itemId: req.body.itemId,userId: req.body.userId});
  console.log(find)
  let removeItem = await cartModel.findByIdAndDelete({ _id: find._id });
  let pipe = [
    {
      $match: {
        userId: mongoose.Types.ObjectId(`${req.body.userId}`),
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
};
let updateItemFromCart = async (req, res) => {
  let find = await cartModel.findOne({
    itemId: req.body.itemId,
    userId: req.body.userId,
  });

  let updateItem = await cartModel.findByIdAndUpdate(
    { _id: find._id },
    { quantity: req.body.quantity },
    { new: true }
  );
  let pipe = [
    {
      $match: {
        userId: mongoose.Types.ObjectId(`${req.body.userId}`),
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
};
module.exports = {
  addToCart,
  cartItem,
  removeItemFromCart,
  updateItemFromCart,
};
