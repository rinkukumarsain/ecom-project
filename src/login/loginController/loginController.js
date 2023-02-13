let registerModel = require("../../model/register");
const { success, error } = require("../../responseApi/responseApi");
let bcrypt = require("bcryptjs");
let login = async (req, res) => {
  try {
    let find = await registerModel.findOne({ email: req.body.email });
    if (find) {
      let isMatch = await bcrypt.compare(req.body.password, find.password);
      if (isMatch) {
        const token = await find.generateAuthToken();

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 50000),
          httpOnly: true,
        });
        let response = { email: find.email, token: token };
        success(res, "Login Successfuly", 200,response);
      } else {
        error(res, "Wrong Password", 400);
      }
    } else {
      error(res, "User Not Found", 400);
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { login };
