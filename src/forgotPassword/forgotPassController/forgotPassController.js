let registerModel = require("../../model/register");
let nodemailer = require("nodemailer");
let bcrypt = require("bcryptjs");
const { success, error } = require("../../responseApi/responseApi");
let { mail, genrateotp } = require("../../helper/sendEmail");
const { findOne, findByIdAndUpdate } = require("../../model/register");

let forgotPassword = async (req, res) => {
  try {
    let checkUser = await registerModel.findOne({ email: req.body.email });
    let otpvalue = Math.floor(Math.random() * 899999 + 100000);
    if (checkUser) {
      mail(
        req.body.email,
        `otp`,
        genrateotp(`
      <h1>${otpvalue}</h1>
      `)
      );
      console.log(Date.now);
      insertOtp = await registerModel.findByIdAndUpdate(
        { _id: checkUser._id },
        { otp: otpvalue, otpExpireTime: Date.now() + 50000 },
        { new: true }
      );
      console.log(insertOtp);

      success(res, "Otp sent", 200);
    } else {
      error(res, "User Not Found", 400);
    }
  } catch (e) {
    error(res,e,400)
  }
};

let setNewPassword = async (req, res) => {
  try{
    let bodyOtp = req.body.otp;
    let bodyEmail = req.body.email;
    let newPassword = req.body.newPassword.toString();
    let newConfirmPassword = req.body.newConfirmPassword.toString();
    let getEmailData = await registerModel.findOne({ email: bodyEmail });
  
    console.log(newPassword,typeof(newPassword))
    if (getEmailData) {
      if (
        getEmailData.otp === bodyOtp &&
        getEmailData.otpExpireTime > Date.now()
      ) {
        if (newPassword === newConfirmPassword) {
          newPassword = await bcrypt.hash(newPassword, 10);
          newConfirmPassword = await bcrypt.hash(newConfirmPassword, 10);
  
          console.log(newPassword)
          console.log(newConfirmPassword,"cccccccccccccccc")
          let updatePassword = await registerModel.findByIdAndUpdate(
            { _id: getEmailData._id },
            {
              password: newPassword,
              confirmpassword: newConfirmPassword,
              otp: "",
            },
            { new: true }
          );
  
          success(res, "Password Changed Successfully", 200);
        } else {
          error(res, "Password and Confirm Password are not matched", 400);
        }
      } else {
        error(res, "Wrong OTP", 400);
      }
    } else {
      error(res, "User Not Found", 400);
    }
  }catch(e){
    error(res,e,400)
  }

};
module.exports = { forgotPassword, setNewPassword };
