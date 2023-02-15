require("dotenv").config();
let express = require("express");
let app = express();
let port = process.env.PORT;
const cors = require("cors");
let mongoose = require("mongoose");
mongoose.set("strictQuery", true);
let connection = require("./src/dbConnection/conn");
let path=require('path')
let publicpath=path.join(__dirname,"./public")
app.use(express.static(publicpath))
let registerRoute = require("./src/register/registerRoute/regRout");
let loginRoute = require("./src/login/loginRoute/loginRoute");
let categoryRoute = require("./src/category/categoryRoute/categoryRoute");
let productRoute = require("./src/product/productRoute/productRoute");
const forgotPassRoute = require("./src/forgotPassword/forgotPassRoute/forgotPassRoute");
const mostPopularCoursesRoute = require("./src/mostPopularCourses/mostPopularCoursesRoute/mostPopularCoursesRoute");
const learningAtFingertipsRoute = require("./src/learningAtFingertips/learningAtFingertipsRoute/learningAtFingertipsRoute");
const addTocartRoute = require("./src/addToCart/addToCartRoute/addToCartRoute");
const courseDetailRoute=require('./src/courseDetail/courseDetailRoute/courseDetailRoute')
const addressRoute=require('./src/Address/addressRoute/addressRoute')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registerRoute);
app.use(loginRoute);
app.use(forgotPassRoute);
app.use(categoryRoute);
app.use(mostPopularCoursesRoute);
app.use(productRoute);
app.use(addTocartRoute);
app.use(learningAtFingertipsRoute);
app.use(courseDetailRoute)
app.use(addressRoute)
app.listen(port, (err) => {
  if (!err) {
    console.log("connected to server on the port number " + port);
  } else {
    console.log("connection failed");
  }
});
