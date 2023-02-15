let mongoose = require("mongoose");
let addressSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,

    required: true,

    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
    },
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: Number,
    validate: {
        validator: function (v) {
          return /^[0-9]{6}$/.test(v);
        },
      },
  },
  address: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

let addressModel = mongoose.model("addressmodel", addressSchema);
module.exports = addressModel;
