require("dotenv").config();
let express = require("express");
let app = express();
let port = process.env.PORT;
const cors = require("cors");
let mongoose = require("mongoose");
mongoose.set("strictQuery", true);
let connection = require("../Api/src/dbConnection/conn");

let registerRoute = require("../Api/src/register/registerRoute/regRout");
let loginRoute = require("../Api/src/login/loginRoute/loginRoute");
let categoryRoute = require("../Api/src/category/categoryRoute/categoryRoute");
let productRoute = require("../Api/src/product/productRoute/productRoute");
const forgotPassRoute = require("../Api/src/forgotPassword/forgotPassRoute/forgotPassRoute");
const mostPopularCoursesRoute = require("../Api/src/mostPopularCourses/mostPopularCoursesRoute/mostPopularCoursesRoute");
const learningAtFingertipsRoute = require("../Api/src/learningAtFingertips/learningAtFingertipsRoute/learningAtFingertipsRoute");
const addTocartRoute = require("../Api/src/addToCart/addToCartRoute/addToCartRoute");
const courseDetailRoute=require('../Api/src/courseDetail/courseDetailRoute/courseDetailRoute')
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

app.listen(port, (err) => {
  if (!err) {
    console.log("connected to server on the port number " + port);
  } else {
    console.log("connection failed");
  }
});
